"""Render LP-M3 design artifacts, not runtime website source.

Uses the approved LP-M2 copy verbatim and the official Capriola font.
Run with Pillow; outputs full-page screens, direction board and state sheet.
"""
from pathlib import Path
import re
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
COPY = (ROOT.parent / 'LP-M2-content-and-ux.md').read_text(encoding='utf-8')
FONT = ROOT / 'assets' / 'Capriola.ttf'
BG, SURFACE, SECONDARY, ACCENT, TEXT = '#0F0E47', '#272757', '#505081', '#8686AC', '#F7F7FC'
BOUNDS = []

def font(size):
    f = ImageFont.truetype(str(FONT), round(size))
    try:
        f.set_variation_by_axes([400])
    except (OSError, AttributeError):
        pass
    return f

def clean(s):
    return re.sub(r'\*\*(.*?)\*\*', r'\1', s).strip()

def section(number):
    start = re.search(rf'^### {number}\. .*$', COPY, re.M).end()
    end = re.search(r'^### |^## ', COPY[start:], re.M)
    return COPY[start:start + end.start()].strip()

def paras(number):
    return [p.strip() for p in section(number).split('\n\n') if p.strip()]

def title(p):
    return clean(p.split('**')[1])

class Canvas:
    def __init__(self, width, name, height=16000):
        self.width, self.name = width, name
        self.im = Image.new('RGB', (width, height), BG)
        self.d = ImageDraw.Draw(self.im)
        self.pad = 16 if width < 672 else 24 if width < 1024 else (width-1152)//2
        self.x, self.w, self.y = self.pad, width-2*self.pad, 0
        self.mobile = width < 672
        self.tablet = 672 <= width < 1024
        self.body = 16 if self.mobile else 17
        self.gap = 48 if self.mobile else 64

    def rect(self, x, y, w, h, fill=SURFACE, radius=16, outline=None, sw=1):
        self.d.rounded_rectangle((x, y, x+w, y+h), radius=radius, fill=fill, outline=outline, width=sw)

    def text(self, text, x, y, width, size=17, color=TEXT, leading=1.65):
        f = font(size)
        lines = []
        for paragraph in text.split('\n'):
            line = ''
            for word in paragraph.split():
                trial = (line+' '+word).strip()
                if line and self.d.textlength(trial, font=f) > width:
                    lines.append(line)
                    line = word
                else:
                    line = trial
            lines.append(line)
        lh = round(size*leading)
        for line in lines:
            length = self.d.textlength(line, font=f)
            assert length <= width+1, (self.name, line, width, length)
            assert x+length <= self.width+1, (self.name, line, x+length)
            self.d.text((x, y), line, font=f, fill=color, anchor='lt')
            BOUNDS.append((self.name, line, round(x), round(y), round(length)))
            y += lh
        return y

    def label(self, label, y):
        return self.text(label, self.x, y, self.w, 12, ACCENT, 1.4)+16

    def heading(self, num, label, text):
        self.y = self.label(f'{num:02d}  /  {label.upper()}', self.y)
        self.y = self.text(text, self.x, self.y, min(self.w, 760), 28 if self.mobile else 38, leading=1.27)+28

    def buttons(self, x, y, w, focus=False, active=False):
        labels = ['Explore CLI workflows', 'View product status']
        widths = [w,w] if self.mobile else [252,235]
        cy = y
        for i, label in enumerate(labels):
            bx = x if self.mobile else x + (268 if i else 0)
            by = cy if self.mobile else y
            fill = ACCENT if i == 0 else BG
            self.rect(bx, by, widths[i], 56, fill, 8, ACCENT, 1)
            if focus and i == 0:
                self.d.rounded_rectangle((bx-6,by-6,bx+widths[i]+6,by+62), radius=12, outline=TEXT,width=3)
            tw = self.d.textlength(label,font=font(15))
            self.text(label,bx+(widths[i]-tw)/2,by+19,widths[i],15,BG if i==0 else TEXT,1)
            if active:
                self.d.line((bx+20,by+40,bx+widths[i]-20,by+40),fill=BG if i==0 else TEXT,width=2)
            cy += 68
        return y + (124 if self.mobile else 56)

    def header(self, expanded=False):
        self.y = 26
        # Original nested review-bracket mark, decorative beside the text wordmark.
        self.d.line((self.x+10,32,self.x,32,self.x,52,self.x+10,52),fill=TEXT,width=2)
        self.d.line((self.x+18,32,self.x+28,32,self.x+28,52,self.x+18,52),fill=ACCENT,width=2)
        self.d.ellipse((self.x+12,40,self.x+16,44),fill=TEXT)
        self.text('QAEOps',self.x+42,28,150,24,leading=1)
        if self.width < 1024:
            self.rect(self.width-self.pad-82,20,82,44,BG,8,ACCENT)
            self.text('Menu',self.width-self.pad-65,34,65,14,leading=1)
        else:
            nx=self.width-self.pad-495
            for label, advance in [('What it is',135),('Workflows',145),("Who it’s for",150),('FAQ',65)]:
                self.text(label,nx,36,advance,14,leading=1);nx+=advance
        self.y = 90
        self.d.line((self.x,self.y,self.width-self.pad,self.y),fill=SECONDARY,width=1)
        if expanded:
            for label in ['What it is','Workflows',"Who it’s for",'FAQ']:
                self.text(label,self.x,self.y+22,self.w,16);self.y+=58
        self.y += self.gap

    def hero(self):
        p=paras(1)
        self.y=self.label('QAEOps / QUALITY ENGINEERING ASSISTANT',self.y)
        self.y=self.text(title(p[0]),self.x,self.y,min(self.w,820),34 if self.mobile else 48 if self.tablet else 60,leading=1.16)+28
        self.y=self.text(p[1],self.x,self.y,min(self.w,690),self.body,leading=1.7)+24
        self.y=self.text(p[2],self.x,self.y,min(self.w,690),14,ACCENT,1.6)+28
        self.y=self.buttons(self.x,self.y,self.w)+self.gap
        # A small noninformative artifact-line motif, never a product preview.
        self.d.line((self.x,self.y,self.width-self.pad,self.y),fill=SECONDARY,width=1)
        for i in range(3):
            dx=self.width-self.pad-80+i*32
            self.d.ellipse((dx,self.y-4,dx+8,self.y+4),fill=ACCENT)
        self.y+=self.gap

    def intro(self):
        p=paras(2);self.heading(1,'What it is',title(p[0]))
        for t in p[1:]:self.y=self.text(t,self.x,self.y,min(self.w,740),self.body)+18
        self.y+=self.gap-18

    def group(self, number, label, groups, heading):
        self.heading(number,label,heading)
        cols=1 if self.mobile else 2 if self.tablet else 3
        gap=24;cw=(self.w-(cols-1)*gap)/cols
        by=self.y;bottom=by
        for i,(h,t) in enumerate(groups):
            if i and i%cols==0:by=bottom+32
            x=self.x+(i%cols)*(cw+gap)
            self.d.line((x,by,x+cw,by),fill=ACCENT,width=1)
            yy=self.text(f'0{i+1}',x,by+20,cw,13,ACCENT)+14
            yy=self.text(h,x,yy,cw,20,leading=1.4)+14
            yy=self.text(t,x,yy,cw,self.body)
            bottom=max(bottom,yy)
        self.y=bottom+self.gap

    def benefits(self):
        p=paras(3);self.group(2,'Why QAEOps',[(title(p[i]),p[i+1]) for i in [1,3,5]],title(p[0]))

    def workflows(self):
        p=paras(4);self.heading(3,'The workflows',title(p[0]))
        self.y=self.text(p[1],self.x,self.y,min(self.w,760),self.body)+32
        steps=re.findall(r'^\d\. \*\*(.*?)\*\* (.*)$',section(4),re.M)
        cols=1 if self.mobile else 3;gap=24;cw=(self.w-gap*(cols-1))/cols;bottom=self.y
        for i,(h,t) in enumerate(steps):
            x=self.x+(i%cols)*(cw+gap);by=self.y if cols>1 else bottom
            self.rect(x,by,32,32,SECONDARY,16)
            self.text(str(i+1),x+11,by+8,22,14,leading=1)
            yy=self.text(h,x,by+48,cw,18,leading=1.4)+12
            yy=self.text(t,x,yy,cw,self.body)
            bottom=max(bottom,yy+28)
        self.y=bottom+16
        self.y=self.text('Examples of inputs and starting points.',self.x,self.y,self.w,23,leading=1.4)+12
        self.y=self.text('These are illustrative examples, not captured product results.',self.x,self.y,self.w,14,ACCENT)+24
        rows=[]
        for line in section(4).splitlines():
            if line.startswith('| ') and not line.startswith('| Workflow') and not line.startswith('| ---'):
                rows.append([a.strip() for a in line.strip('|').split('|')])
        cols=1 if self.mobile else 2;cw=(self.w-24*(cols-1))/cols
        for start in range(0,len(rows),cols):
            batch=rows[start:start+cols];heights=[]
            # Render text into a temporary copy to measure wrapped content before surface paint.
            for row in batch:
                yy=0
                for txt,sz,lead in [(row[0],20,1.4),('EXAMPLE INPUT',12,1.5),(row[1],self.body,1.65),('STARTING POINT TO REVIEW',12,1.5),(row[2],self.body,1.65)]:
                    f=font(sz);line='';n=1
                    for word in txt.split():
                        trial=(line+' '+word).strip()
                        if line and self.d.textlength(trial,font=f)>cw-48:n+=1;line=word
                        else:line=trial
                    yy+=n*round(sz*lead)+16
                heights.append(yy+32)
            height=max(heights)
            for j,row in enumerate(batch):
                x=self.x+j*(cw+24);self.rect(x,self.y,cw,height,SURFACE,16)
                yy=self.y+24
                for txt,sz,lead in [(row[0],20,1.4),('EXAMPLE INPUT',12,1.5),(row[1],self.body,1.65),('STARTING POINT TO REVIEW',12,1.5),(row[2],self.body,1.65)]:
                    yy=self.text(txt,x+24,yy,cw-48,sz,TEXT,lead)+16
            self.y+=height+24
        self.y=self.text('AI-generated output can be incomplete or incorrect. Review drafts, data, and code before use.',self.x,self.y,min(self.w,760),self.body)+20
        self.y=self.text('These workflows use the CLI. AI-assisted tasks require LM Studio and a suitable local model.',self.x,self.y,min(self.w,760),14)+12
        self.y=self.text('What setup do I need?',self.x,self.y,self.w,14,ACCENT)+4
        self.d.line((self.x,self.y-7,self.x+175,self.y-7),fill=ACCENT,width=1)
        self.y+=self.gap

    def audiences(self):
        p=paras(5);self.group(4,'Who it is for',[(title(p[i]),p[i+1]) for i in [1,3,5]],title(p[0]))

    def faq(self):
        # Centered readable column at desktop, with all status content visible.
        oldx,oldw=self.x,self.w
        self.w=min(self.w,760);self.x=(self.width-self.w)/2
        self.heading(5,'Status and questions','Questions before you go further.')
        self.y=self.text('Product status',self.x,self.y,self.w,24,leading=1.4)+12
        self.y=self.text('Status reviewed: 6 September 2026.',self.x,self.y,self.w,14,ACCENT)+24
        lines=re.findall(r'^- \*\*(.*?)\*\* (.*)$',section(6),re.M)
        for h,t in lines:
            self.d.line((self.x,self.y,self.x,self.y+32),fill=ACCENT,width=2)
            yy=self.text(h,self.x+18,self.y,self.w-18,17,leading=1.4)+10
            self.y=self.text(t,self.x+18,yy,self.w-18,self.body)+24
        self.y=self.text("The CLI functionality above is described in the project's current documentation. This page does not establish production readiness.",self.x,self.y,self.w,14)+32
        self.questions=re.findall(r'^\d\. \*\*(.*?)\*\* (.*)$',section(6),re.M)
        for q,a in self.questions:
            self.d.line((self.x,self.y,self.x+self.w,self.y),fill=SECONDARY,width=1)
            self.y=self.text(q,self.x,self.y+22,self.w-40,16,leading=1.5)+22
            self.text('+',self.x+self.w-24,self.y-46,24,22,ACCENT,1)
        self.d.line((self.x,self.y,self.x+self.w,self.y),fill=SECONDARY,width=1)
        self.x,self.w=oldx,oldw;self.y+=self.gap

    def closing(self):
        p=paras(7)
        self.y=self.label('06  /  YOUR NEXT STEP',self.y)
        self.y=self.text(title(p[0]),self.x,self.y,min(self.w,800),28 if self.mobile else 38,leading=1.27)+24
        self.y=self.text(p[1],self.x,self.y,min(self.w,720),self.body)+28
        self.y=self.buttons(self.x,self.y,self.w)+self.gap
        self.d.line((self.x,self.y,self.x+self.w,self.y),fill=SECONDARY,width=1)
        self.y+=28
        self.y=self.text('QAEOps — Local AI assistance for test preparation.',self.x,self.y,self.w,14)+16
        self.y=self.text('Back to top',self.x,self.y,self.w,14,ACCENT)
        self.d.line((self.x,self.y-7,self.x+self.d.textlength('Back to top',font=font(14)),self.y-7),fill=ACCENT,width=1)
        self.y+=36

    def save(self):
        assert self.y<self.im.height
        self.im.crop((0,0,self.width,round(self.y))).save(ROOT / f'{self.name}.png')
        return {'name':self.name,'width':self.width,'height':round(self.y)}

screens=[]
for width,name in [(390,'mobile'),(768,'tablet'),(1440,'desktop')]:
    c=Canvas(width,name)
    c.header();c.hero();c.intro();c.benefits();c.workflows();c.audiences();c.faq();c.closing()
    screens.append(c.save())

c=Canvas(1440,'header-hero');c.header();c.hero();screens.append(c.save())
c=Canvas(390,'mobile-expanded');c.header(expanded=True)
c.y=c.text('What setup do I need?',c.x,c.y,c.w-32,18,leading=1.4)+24
c.y=c.text(re.sub(r'^\(`.*?`\) ', '',re.findall(r'^1\. \*\*What setup do I need\?\*\* (.*)$',section(6),re.M)[0]),c.x,c.y,c.w,16)+40
screens.append(c.save())

# A direction board uses real type, palette and the original bracket/trace motif.
c=Canvas(1440,'direction-board');c.x=64;c.w=1312;c.y=56
c.y=c.label('LP-M3 / VISUAL DIRECTION',c.y)
c.y=c.text('Quiet precision. Human judgment.',64,c.y,1200,44,leading=1.25)+24
c.y=c.text('Calm space, clear artifacts, and a visible place for review.',64,c.y,1200,21)+44
for i,(color,label) in enumerate([(BG,'Background'),(SURFACE,'Surface'),(SECONDARY,'Secondary'),(ACCENT,'Accent'),(TEXT,'Readable text')]):
    x=64+i*264;c.rect(x,c.y,240,96,color,12,ACCENT if i==0 else None)
    c.text(color,x,c.y+112,240,18);c.text(label,x,c.y+144,240,14)
c.y+=220
c.text('Aa',64,c.y,350,100,leading=1)
c.text('Capriola / Regular 400',440,c.y+8,800,28)
c.text('A precise assistant with an approachable voice.',440,c.y+58,800,19)
c.y+=156
for i,(h,t) in enumerate([('Calm','Space is part of the hierarchy. No animated backgrounds or noisy gradients.'),('Precise','Repeat the same input and output labels. Separate documented and planned functionality.'),('Approachable','Readable text, descriptive actions, and visible human review.')]):
    x=64+i*448;c.d.line((x,c.y,x+416,c.y),fill=ACCENT,width=1)
    yy=c.text(h,x,c.y+24,416,24)+18;c.text(t,x,yy,400,18)
c.y+=228
c.rect(64,c.y,1312,158,SURFACE,16)
c.text('[  •  ]   —   [  •  ]   —   [  •  ]',96,c.y+30,800,34)
c.text('Original review-bracket motif. Decorative, not a product screen.',96,c.y+94,1200,16)
c.y+=210
c.text('NEAR: inspiration in restraint only. No reference assets, copied composition, or borrowed copy.',64,c.y,1250,17)
c.y+=82;screens.append(c.save())

c=Canvas(1440,'component-states');c.x=64;c.w=1312;c.y=48
c.y=c.label('LP-M3 / COMPONENT STATES',c.y)
c.y=c.text('Recognizable actions. Visible states.',64,c.y,1200,40,leading=1.25)+40
for state in ['Default','Hover / underline','Focus / offset ring','Active / underline retained']:
    c.text(state,64,c.y+18,430,19)
    c.buttons(480,c.y,800,focus=state.startswith('Focus'),active=state.startswith(('Hover','Active')))
    c.y+=102
c.y+=20
c.y=c.text('Expanded FAQ',64,c.y,1200,26)+16
c.rect(64,c.y,900,240,SURFACE,12)
c.text('What setup do I need?',88,c.y+24,790,19)
c.text('−',916,c.y+24,24,22,ACCENT,1)
answer=re.findall(r'^1\. \*\*What setup do I need\?\*\* (.*)$',section(6),re.M)[0]
answer=re.sub(r'^\(`.*?`\) ', '',answer)
c.text(answer,88,c.y+76,830,17)
c.y+=280
c.y=c.text('Expanded mobile navigation',64,c.y,1200,26)+16
c.rect(64,c.y,390,320,SURFACE,12)
c.text('QAEOps',88,c.y+24,180,19)
c.rect(338,c.y+14,92,44,SURFACE,8,ACCENT)
c.text('Menu −',350,c.y+28,76,14,leading=1)
for i,t in enumerate(['What it is','Workflows',"Who it’s for",'FAQ']):c.text(t,88,c.y+86+i*52,330,16)
c.text('Inline expansion pushes content down.\nNo overlay, focus trap, or scroll lock.\nEscape closes and returns focus to Menu.',510,c.y+40,740,21)
c.y+=360
c.y=c.text('Disabled: not used on this landing page.',64,c.y,1250,23)+18
c.y=c.text('No unavailable CTA is presented as disabled. Native controls retain their semantic state; planned functionality stays descriptive text.',64,c.y,1200,18)+36
c.y=c.text('Motion: 120ms underline color feedback only; reduced motion is immediate.\nMenu, FAQ, focus, and anchor navigation change instantly.',64,c.y,1200,18)+44
screens.append(c.save())

overview=Image.new('RGB',(1440,1050),BG);d=ImageDraw.Draw(overview)
d.text((40,24),'QAEOps / Responsive design overview',font=font(28),fill=TEXT)
for x,width,name in [(40,820,'desktop'),(900,330,'tablet'),(1270,130,'mobile')]:
    im=Image.open(ROOT/f'{name}.png');im.thumbnail((width,920))
    overview.paste(im,(x,100));d.text((x,72),name.title(),font=font(16),fill=TEXT)
overview.save(ROOT/'overview.png')
(ROOT/'render-report.json').write_text(json.dumps({'font':font(16).getname(),'screens':screens,'text_runs_checked':len(BOUNDS),'checks':'All text runs wrap within their assigned widths; all full-page screens fit the render canvas.'},indent=2),encoding='utf-8')
def luminance(hex_color):
    channels=[int(hex_color[i:i+2],16)/255 for i in (1,3,5)]
    linear=[v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4 for v in channels]
    return sum(v*w for v,w in zip(linear,[0.2126,0.7152,0.0722]))
colors=[BG,SURFACE,SECONDARY,ACCENT,TEXT]
pairs=[]
for i,a in enumerate(colors):
    for b in colors[i+1:]:
        low,high=sorted([luminance(a),luminance(b)])
        ratio=(high+0.05)/(low+0.05)
        pairs.append({'a':a,'b':b,'ratio':ratio,'normalTextAA':ratio>=4.5,'largeTextAndRequiredIndicatorAA':ratio>=3})
(ROOT/'contrast-report.json').write_text(json.dumps({'method':'WCAG sRGB relative luminance, opaque colors, no rounded threshold decisions','pairs':pairs},indent=2),encoding='utf-8')
print(json.dumps(screens,indent=2))
