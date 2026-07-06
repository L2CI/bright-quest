import argparse
import math
import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from manim import *


BG = "#050d0f"
CREAM = "#f4f0e6"
MUTED = "#9aa6aa"
TEAL = "#64c7d5"
GOLD = "#d8a34a"
ORANGE = "#c06f32"
GREEN = "#61bf77"
BLUE = "#284674"
BROWN = "#6a4228"


CHAPTERS = {
    6: {
        "id": "mystery-of-stuff",
        "title": "The Mystery of Stuff",
        "subtitle": "Evidence before invisible models",
        "beats": [
            ("Evidence bench", ["cup", "metal spoon", "wool fibre", "plastic bottle"], "ordinary things"),
            ("Object vs material", ["object = what it is for", "material = what it is made from"], "cup is not glass"),
            ("Property detective", ["bend", "shine", "soak", "magnet"], "test one clue"),
            ("Same shape, different stuff", ["wooden spoon", "metal spoon", "plastic spoon"], "job decides material"),
            ("Best for the job", ["raincoat", "window", "pan handle", "wire"], "properties matter"),
            ("Do not jump too early", ["evidence first", "model second"], "earn the model"),
            ("Notebook row", ["object", "material", "property", "evidence"], "write what you observed"),
            ("Mystery tiles", ["bends", "water beads", "soaks", "stiff"], "reason from clues"),
            ("Chapter rule", ["observe", "compare fairly", "give evidence"], "ready for test"),
        ],
    },
    7: {
        "id": "solid-liquid-gas",
        "title": "Solid, Liquid or Gas?",
        "subtitle": "Classify by behaviour",
        "beats": [
            ("No labels yet", ["block", "water", "balloon"], "watch behaviour first"),
            ("Solid clue", ["keeps own shape", "can bend", "does not pour"], "shape stays"),
            ("Liquid clue", ["flows", "takes container shape", "still takes space"], "shape changes"),
            ("Gas clue", ["fills space", "pushes back", "can be invisible"], "air counts"),
            ("Tricky case", ["jelly wobbles", "sponge has air pockets"], "one clue is not enough"),
            ("Now name states", ["solid", "liquid", "gas"], "labels follow evidence"),
            ("Vapour precision", ["water vapour invisible", "mist = droplets"], "safe app model"),
            ("Sort examples", ["ice", "juice", "air tyre", "honey"], "behaviour wins"),
            ("Chapter rule", ["shape", "flow", "space"], "ready for test"),
        ],
    },
    8: {
        "id": "tiny-particles-big-clues",
        "title": "Tiny Particles, Big Clues",
        "subtitle": "A model, not a photograph",
        "beats": [
            ("Model warning", ["dots are symbols", "not microscope photos"], "thinking tool"),
            ("Evidence returns", ["solid keeps shape", "liquid pours", "gas fills"], "explain observations"),
            ("Solid model", ["close", "fixed places", "tiny vibration"], "keeps shape"),
            ("Liquid model", ["close", "slide past", "flows"], "changes shape"),
            ("Gas model", ["far apart", "spread out", "fills space"], "balloon clue"),
            ("Student challenge", ["not wet drops", "not ice cubes", "not tiny balloons"], "model limits"),
            ("Match evidence", ["keeps shape", "pours", "fills space"], "connect the clue"),
            ("Useful limits", ["spacing", "motion", "arrangement"], "do not overbelieve"),
            ("Chapter rule", ["model explains evidence"], "ready for test"),
        ],
    },
    9: {
        "id": "heat-particles-dance",
        "title": "Heat Makes Particles Dance",
        "subtitle": "Warmth moves from warmer to cooler",
        "beats": [
            ("Contact matters", ["warm cup", "cool spoon", "touch point"], "heat path"),
            ("Direction", ["warmer", "cooler", "arrow"], "warmer to cooler"),
            ("Thermometer", ["temperature = reading", "heat = energy moving"], "careful words"),
            ("Student question", ["heat is not the number"], "reading vs transfer"),
            ("Particle wiggle", ["same dots", "more motion", "not hot dots"], "motion changes"),
            ("Cooling", ["heat moves away", "motion slows"], "never frozen-dead"),
            ("Safety", ["warm tap water", "parent check", "no boiling"], "safe setup"),
            ("Predict direction", ["hand to cup", "room to bottle"], "draw the arrow"),
            ("Chapter rule", ["warmer", "cooler", "contact"], "ready for test"),
        ],
    },
    10: {
        "id": "melting-not-disappearing",
        "title": "Melting Is Not Disappearing",
        "subtitle": "Same material, new state",
        "beats": [
            ("Ice evidence", ["solid water", "fixed shape", "timer"], "watch first"),
            ("Shape changed", ["cube shape gone", "water remains"], "not vanished"),
            ("Repair speech", ["cube is gone?", "shape is gone"], "science precision"),
            ("Before and after", ["solid water", "liquid water"], "same stuff"),
            ("Particle model", ["close fixed", "close sliding"], "arrangement changes"),
            ("Freezing reverse", ["liquid to solid", "heat moves away"], "freezer example"),
            ("Other materials", ["butter", "chocolate", "wax"], "app visuals only"),
            ("Safe option", ["sealed bag of ice", "plate", "timer"], "parent nearby"),
            ("Chapter rule", ["material stayed", "state changed"], "ready for test"),
        ],
    },
    11: {
        "id": "dissolving-not-melting",
        "title": "Dissolving Is Not Melting",
        "subtitle": "Spread out does not mean gone",
        "beats": [
            ("Two mysteries", ["ice on plate", "sugar in water"], "similar look, different cause"),
            ("Melting recap", ["solid to liquid", "state change"], "left side"),
            ("Dissolving setup", ["crystals", "water", "stirring"], "do not call it melting"),
            ("Locked correction", ["dissolving is not melting"], "spreading story"),
            ("Dissolving model", ["sugar dots", "water dots", "spread out"], "still there"),
            ("Not gone evidence", ["labelled material", "model", "app-only recovery"], "no tasting"),
            ("Safety boundary", ["no unknown tasting", "no boiling", "parent supervised"], "low risk"),
            ("Compare table", ["melting = state", "dissolving = mixture"], "two rows"),
            ("Chapter rule", ["cannot see it", "does not mean gone"], "ready for test"),
        ],
    },
}


class ChemistryManimScene(Scene):
    chapter_number = 6

    def construct(self):
        spec = CHAPTERS[self.chapter_number]
        config.background_color = BG
        self.camera.background_color = BG
        duration = float(os.environ.get("BQ_CHAPTER_DURATION", "330"))
        beats = spec["beats"]
        beat_len = max(22.0, (duration - 15.0) / len(beats))

        self.add(board_frame())
        title = Text(f"Chemistry 101 - Chapter {self.chapter_number}", color=TEAL, font_size=31, weight=BOLD)
        title.to_corner(UL, buff=0.38)
        heading = Text(spec["title"], color=CREAM, font_size=50, weight=BOLD)
        if heading.width > 6.35:
            heading.scale_to_fit_width(6.35)
        heading.next_to(title, DOWN, aligned_edge=LEFT, buff=0.2)
        subtitle = Text(spec["subtitle"], color=MUTED, font_size=30)
        if subtitle.width > 6.35:
            subtitle.scale_to_fit_width(6.35)
        subtitle.next_to(heading, DOWN, aligned_edge=LEFT, buff=0.18)
        self.add(title, heading)
        self.play(FadeIn(subtitle, shift=0.15 * DOWN), run_time=0.8)

        bench = lab_bench().to_edge(DOWN, buff=0.75)
        ambient = moving_particles(self, 26, spread_x=13.5, spread_y=6.6, opacity=0.22)
        self.add(ambient)
        self.play(FadeIn(bench), run_time=0.8)
        self.add(bench_motion(self))
        self.add(teaching_motion_layer(self))

        hero = chapter_hero(self.chapter_number)
        hero.move_to(DOWN * 1.55)
        self.play(FadeIn(hero, shift=0.2 * UP), run_time=1.0)
        self.wait(min(3.0, beat_len * 0.18))
        self.play(FadeOut(hero, shift=0.1 * DOWN), run_time=0.5)

        current = None
        for index, (beat_title, labels, note) in enumerate(beats):
            panel = make_panel(self.chapter_number, index, beat_title, labels, note)
            panel.to_corner(UR, buff=0.6)
            visual = make_visual(self.chapter_number, index, labels)
            visual.move_to(LEFT * 1.5 + DOWN * 0.7)
            if index % 3 == 2:
                visual.shift(RIGHT * 1.15)
            group = VGroup(panel, visual)
            if current is None:
                self.play(FadeIn(group, shift=0.25 * UP), run_time=1.1)
            else:
                self.play(FadeOut(current, shift=0.15 * DOWN), FadeIn(group, shift=0.2 * UP), run_time=0.9)
            current = group
            self.play(highlight_pulse(panel[1]), run_time=0.6)
            remaining = max(0.2, beat_len - 2.0)
            active_teaching_hold(self, visual, panel, remaining)

        gate = RoundedRectangle(width=5.2, height=1.25, corner_radius=0.18, color=TEAL, stroke_width=3)
        gate.set_fill("#081c20", opacity=0.95).to_corner(DR, buff=0.55)
        gate_text = VGroup(
            Text("Training checkpoint", color=CREAM, font_size=28, weight=BOLD),
            Text("Test follows after this chapter", color=TEAL, font_size=22, weight=BOLD),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(gate.get_center())
        self.play(FadeOut(current), FadeIn(gate), Write(gate_text), run_time=1.2)
        self.wait(max(1.0, min(8.0, duration - self.renderer.time - 0.5)))


class ChemistryChapter06(ChemistryManimScene):
    chapter_number = 6


class ChemistryChapter07(ChemistryManimScene):
    chapter_number = 7


class ChemistryChapter08(ChemistryManimScene):
    chapter_number = 8


class ChemistryChapter09(ChemistryManimScene):
    chapter_number = 9


class ChemistryChapter10(ChemistryManimScene):
    chapter_number = 10


class ChemistryChapter11(ChemistryManimScene):
    chapter_number = 11


def lab_bench():
    top = RoundedRectangle(width=12.8, height=0.7, corner_radius=0.12, stroke_width=0)
    top.set_fill(BROWN, opacity=1)
    base = RoundedRectangle(width=13.6, height=0.42, corner_radius=0.16, stroke_width=0)
    base.set_fill("#2a2119", opacity=1).next_to(top, DOWN, buff=-0.08)
    line = Line(LEFT * 6.05, RIGHT * 6.05, color="#8b5c39", stroke_width=2).move_to(top.get_center() + UP * 0.09)
    return VGroup(base, top, line)


def board_frame():
    frame = RoundedRectangle(width=13.85, height=7.35, corner_radius=0.2, color="#173034", stroke_width=2)
    frame.set_opacity(0.35)
    guide = Line(LEFT * 6.65, RIGHT * 6.65, color="#173034", stroke_width=1)
    guide.set_opacity(0.22).to_edge(DOWN, buff=0.5)
    return VGroup(frame, guide)


def moving_particles(scene, count, spread_x=7, spread_y=3.8, opacity=0.55, color=TEAL):
    tracker = ValueTracker(0)
    tracker.add_updater(lambda m, dt: m.increment_value(dt))
    scene.add(tracker)
    dots = VGroup()
    for i in range(count):
        x = -spread_x / 2 + spread_x * ((i * 37) % 101) / 100
        y = -spread_y / 2 + spread_y * ((i * 53) % 97) / 96
        dot = Dot(radius=0.035 + 0.015 * (i % 3), color=color).set_opacity(opacity)
        base = np.array([x, y, 0.0])
        phase = i * 0.7
        amp = 0.05 + 0.02 * (i % 4)
        dot.move_to(base)
        dot.add_updater(lambda m, dt, b=base, p=phase, a=amp: m.move_to(b + np.array([
            math.sin(tracker.get_value() * 0.8 + p) * a,
            math.cos(tracker.get_value() * 0.65 + p) * a,
            0,
        ])))
        dots.add(dot)
    return dots


def bench_motion(scene):
    tracker = ValueTracker(0)
    tracker.add_updater(lambda m, dt: m.increment_value(dt))
    scene.add(tracker)
    rail = VGroup()
    for i, color in enumerate([TEAL, GOLD, GREEN]):
        dot = Dot(radius=0.12, color=color).set_opacity(0.95)
        dot.add_updater(lambda m, dt, offset=i * 3.7: m.move_to(np.array([
            -5.55 + ((tracker.get_value() * 0.7 + offset) % 11.1),
            -2.26 + 0.1 * math.sin(tracker.get_value() * 2.7 + offset),
            0,
        ])))
        halo = Circle(radius=0.24, color=color, stroke_width=4).set_opacity(0.4)
        halo.add_updater(lambda m, dt, d=dot: m.move_to(d.get_center()))
        rail.add(halo, dot)
    return rail


def teaching_motion_layer(scene):
    tracker = ValueTracker(0)
    tracker.add_updater(lambda m, dt: m.increment_value(dt))
    scene.add(tracker)

    sweep = always_redraw(lambda: build_sweep_marker(tracker.get_value()))
    orbit = always_redraw(lambda: build_orbit_marker(tracker.get_value()))
    return VGroup(sweep, orbit)


def active_teaching_hold(scene, visual, panel, duration):
    remaining = duration
    cycle = 0
    while remaining > 0.05:
        run_time = min(2.25, remaining)
        if cycle % 4 == 0:
            scene.play(
                visual.animate.shift(RIGHT * 0.36),
                rate_func=there_and_back,
                run_time=run_time,
            )
        elif cycle % 4 == 1:
            scene.play(
                panel.animate.shift(LEFT * 0.18),
                rate_func=there_and_back,
                run_time=run_time,
            )
        elif cycle % 4 == 2:
            scene.play(
                visual.animate.scale(1.12),
                rate_func=there_and_back,
                run_time=run_time,
            )
        else:
            scene.play(
                panel[1].animate.set_color(GOLD).scale(1.05),
                rate_func=there_and_back,
                run_time=run_time,
            )
        remaining -= run_time
        cycle += 1


def build_sweep_marker(t):
    x = -5.9 + ((t * 1.05) % 11.8)
    marker = Line(
        np.array([x, -2.62, 0.0]),
        np.array([x, -0.35, 0.0]),
        color=GOLD,
        stroke_width=5,
    ).set_opacity(0.32)
    bead = Dot(point=np.array([x, -0.35, 0.0]), radius=0.13, color=GOLD).set_opacity(0.95)
    glow = Circle(radius=0.27, color=GOLD, stroke_width=4).move_to(bead.get_center()).set_opacity(0.35)
    return VGroup(marker, glow, bead)


def build_orbit_marker(t):
    center = np.array([-4.65, -0.72, 0.0])
    radius_x = 0.72
    radius_y = 0.34
    angle = t * 1.35
    point = center + np.array([math.cos(angle) * radius_x, math.sin(angle) * radius_y, 0.0])
    orbit = Ellipse(width=radius_x * 2, height=radius_y * 2, color=TEAL, stroke_width=3)
    orbit.move_to(center).set_opacity(0.28)
    bead = Dot(point=point, radius=0.11, color=TEAL).set_opacity(0.95)
    tail = Line(center, point, color=TEAL, stroke_width=3).set_opacity(0.35)
    return VGroup(orbit, tail, bead)


def chapter_hero(chapter):
    if chapter == 6:
        return VGroup(pencil().scale(0.8).shift(LEFT * 3.3), beaker().scale(0.9), spoon().scale(0.9).shift(RIGHT * 2.6), salt_chunks().shift(RIGHT * 3.45 + UP * 0.45))
    if chapter == 7:
        return VGroup(cube_icon().scale(0.9).shift(LEFT * 2.6), beaker(fill=True).scale(0.95), balloon_icon().scale(0.95).shift(RIGHT * 2.5))
    if chapter == 8:
        return VGroup(particle_grid("solid").shift(LEFT * 3.0), particle_grid("liquid"), particle_grid("gas").shift(RIGHT * 3.1))
    if chapter == 9:
        return VGroup(cup_with_spoon().scale(0.9), thermometer().shift(RIGHT * 3.5), heat_arrows().shift(RIGHT * 1.2 + UP * 0.2))
    if chapter == 10:
        return VGroup(ice_cube().shift(LEFT * 2.0), melting_arrow(), puddle().shift(RIGHT * 2.1))
    return VGroup(beaker(fill=True).shift(LEFT * 1.6), sugar_crystal().shift(LEFT * 3.5 + UP * 0.5), dissolving_dots().shift(RIGHT * 1.8))


def make_panel(chapter, index, title, labels, note):
    box = RoundedRectangle(width=4.5, height=2.55, corner_radius=0.16, color="#253940", stroke_width=2)
    box.set_fill("#071518", opacity=0.92)
    head = Text(title, color=GOLD if index % 2 else TEAL, font_size=27, weight=BOLD)
    head.to_corner(UL)
    bullets = VGroup()
    for label in labels[:4]:
        t = Text(label, color=CREAM, font_size=19)
        bullets.add(t)
    bullets.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
    bullets.next_to(head, DOWN, aligned_edge=LEFT, buff=0.28)
    footer = Text(note, color=MUTED, font_size=18)
    footer.next_to(bullets, DOWN, aligned_edge=LEFT, buff=0.26)
    content = VGroup(head, bullets, footer)
    content.move_to(box.get_center()).align_to(box, LEFT).shift(RIGHT * 0.28)
    return VGroup(box, content)


def make_visual(chapter, index, labels):
    if chapter == 6:
        if index in (1, 6):
            return property_table(labels)
        if index in (3, 4, 7):
            return VGroup(spoon().shift(LEFT * 1.1), spoon(color="#d4aa62").shift(RIGHT * 0.45), rounded_label(labels[0]).shift(DOWN * 1.0))
        return chapter_hero(6).scale(0.82)
    if chapter == 7:
        if index in (1, 2, 3, 7):
            return state_triptych()
        if index == 4:
            return VGroup(jelly_icon().shift(LEFT * 1.2), sponge_icon().shift(RIGHT * 1.1), rounded_label("tricky").shift(DOWN * 1.0))
        return chapter_hero(7).scale(0.85)
    if chapter == 8:
        return VGroup(particle_grid("solid").shift(LEFT * 2.4), particle_grid("liquid"), particle_grid("gas").shift(RIGHT * 2.6), rounded_label(labels[0]).shift(DOWN * 1.25))
    if chapter == 9:
        if index in (4, 5):
            return wiggle_particles()
        return VGroup(cup_with_spoon(), thermometer().shift(RIGHT * 3.1), heat_arrows().shift(RIGHT * 0.85 + UP * 0.25))
    if chapter == 10:
        if index in (4,):
            return VGroup(particle_grid("solid").scale(0.8).shift(LEFT * 1.7), melting_arrow().scale(0.8), particle_grid("liquid").scale(0.8).shift(RIGHT * 1.7))
        return VGroup(ice_cube().shift(LEFT * 1.8), melting_arrow(), puddle().shift(RIGHT * 1.9), rounded_label("water").shift(DOWN * 1.2))
    if index in (3, 4, 7):
        return VGroup(sugar_crystal().shift(LEFT * 2.2), Arrow(LEFT * 1.25, RIGHT * 0.45, color=TEAL), dissolving_dots().shift(RIGHT * 1.8), rounded_label("spread out").shift(DOWN * 1.2))
    return chapter_hero(11).scale(0.9)


def highlight_pulse(mobj):
    return Indicate(mobj, color=TEAL, scale_factor=1.02)


def rounded_label(text, color=TEAL):
    label = Text(text, color=CREAM, font_size=21, weight=BOLD)
    pad = RoundedRectangle(width=max(1.55, label.width + 0.45), height=0.45, corner_radius=0.1, color=color, stroke_width=1.5)
    pad.set_fill("#061316", opacity=0.92)
    return VGroup(pad, label.move_to(pad.get_center()))


def pencil():
    body = Polygon(LEFT * 1.8 + DOWN * 0.12, RIGHT * 1.25 + DOWN * 0.12, RIGHT * 1.25 + UP * 0.12, LEFT * 1.8 + UP * 0.12, color="#f2c14e")
    body.set_fill("#f2c14e", opacity=1).set_stroke("#c99728", 1.5)
    tip = Polygon(RIGHT * 1.25 + DOWN * 0.12, RIGHT * 1.58, RIGHT * 1.25 + UP * 0.12, color="#f7e5b5")
    tip.set_fill("#f7e5b5", opacity=1).set_stroke(CREAM, 1)
    lead = Polygon(RIGHT * 1.58, RIGHT * 1.43 + DOWN * 0.055, RIGHT * 1.43 + UP * 0.055, color="#222")
    lead.set_fill("#222", opacity=1)
    eraser = Rectangle(width=0.33, height=0.24, color="#ef766f").set_fill("#ef766f", opacity=1).next_to(body, LEFT, buff=0)
    return VGroup(body, tip, lead, eraser)


def beaker(fill=False):
    outline = VGroup(
        Line(LEFT * 0.65 + UP * 1.0, LEFT * 0.38 + DOWN * 1.0, color="#b8e9ef", stroke_width=5),
        Line(RIGHT * 0.65 + UP * 1.0, RIGHT * 0.38 + DOWN * 1.0, color="#b8e9ef", stroke_width=5),
        oval_arc(1.3, 0.22, 0, TAU, "#b8e9ef", 5).shift(UP * 1.0),
        oval_arc(0.78, 0.22, PI, PI, "#b8e9ef", 5).shift(DOWN * 1.0),
    )
    water = Rectangle(width=0.75, height=0.48, stroke_width=0).set_fill("#2b8798", opacity=0.7).shift(DOWN * 0.52) if fill else VGroup()
    bubbles = VGroup(*[Dot(radius=0.035, color=TEAL).shift(DOWN * 0.55 + RIGHT * (-0.25 + i * 0.25) + UP * (0.08 * (i % 2))) for i in range(4)])
    return VGroup(water, outline, bubbles)


def spoon(color="#e9ecef"):
    stem = Rectangle(width=1.75, height=0.08, stroke_width=0).set_fill(color, opacity=1)
    bowl = Ellipse(width=0.75, height=0.42, color=color, stroke_width=3).set_fill("#f3f4f4", opacity=0.95).next_to(stem, RIGHT, buff=-0.05)
    return VGroup(stem, bowl)


def salt_chunks():
    chunks = VGroup()
    for i in range(6):
        s = Square(side_length=0.24 + 0.03 * (i % 2), color=CREAM, stroke_width=1).set_fill(CREAM, opacity=0.94)
        s.rotate((i - 2) * 0.22).shift(RIGHT * (0.22 * (i % 3)) + UP * (0.18 * (i // 3)))
        chunks.add(s)
    return chunks


def cube_icon():
    front = Polygon(ORIGIN, RIGHT * 0.85 + UP * 0.34, RIGHT * 0.85 + DOWN * 0.55, DOWN * 0.9, color=CREAM).set_fill("#cde1d8", opacity=0.9)
    side = Polygon(RIGHT * 0.85 + UP * 0.34, RIGHT * 1.55 + UP * 0.72, RIGHT * 1.55 + DOWN * 0.18, RIGHT * 0.85 + DOWN * 0.55, color=CREAM).set_fill(BLUE, opacity=0.95)
    top = Polygon(ORIGIN, RIGHT * 0.7 + UP * 0.38, RIGHT * 1.55 + UP * 0.72, RIGHT * 0.85 + UP * 0.34, color=CREAM).set_fill("#d9eee5", opacity=0.95)
    return VGroup(front, side, top).move_to(ORIGIN)


def balloon_icon():
    b = Circle(radius=0.7, color=TEAL, stroke_width=5).set_fill("#48bfd2", opacity=0.35)
    knot = Triangle(color=TEAL, stroke_width=2).set_fill(TEAL, opacity=0.7).scale(0.16).next_to(b, DOWN, buff=-0.03)
    arrows = VGroup(*[Arrow(ORIGIN, 0.55 * np.array([math.cos(a), math.sin(a), 0]), color=CREAM, buff=0, stroke_width=3).shift(0.1 * np.array([math.cos(a), math.sin(a), 0])) for a in (0.35, 2.1, 4.2)])
    return VGroup(b, knot, arrows)


def particle_grid(kind):
    dots = VGroup()
    if kind == "solid":
        for r in range(4):
            for c in range(5):
                dots.add(Dot(radius=0.1, color=TEAL).shift(RIGHT * (c * 0.34) + DOWN * (r * 0.32)))
    elif kind == "liquid":
        coords = [(0, 0), (.35, .05), (.73, -.05), (.15, -.34), (.52, -.38), (.9, -.31), (.32, -.68), (.72, -.72), (1.05, -.62)]
        for x, y in coords:
            dots.add(Dot(radius=0.11, color=TEAL).shift(RIGHT * x + UP * y))
    else:
        coords = [(0, 0), (.9, .55), (1.7, -.25), (.35, -1.0), (2.05, -1.1), (1.35, -1.6)]
        for x, y in coords:
            dots.add(Dot(radius=0.12, color=TEAL).shift(RIGHT * x + UP * y))
    dots.move_to(ORIGIN)
    return dots


def heat_arrows():
    return VGroup(
        Arrow(LEFT * 1.4, RIGHT * 0.2, color=GOLD, stroke_width=7, buff=0.05),
        Arrow(LEFT * 1.0 + DOWN * 0.35, RIGHT * 0.55 + DOWN * 0.35, color=GOLD, stroke_width=5, buff=0.05),
        Arrow(LEFT * 0.75 + UP * 0.35, RIGHT * 0.8 + UP * 0.35, color=GOLD, stroke_width=5, buff=0.05),
    )


def cup_with_spoon():
    cup = beaker(fill=True)
    sp = spoon().rotate(-0.18).shift(RIGHT * 0.95 + UP * 0.25)
    warm = VGroup(*[Arc(radius=0.35 + i * 0.14, start_angle=0.1, angle=1.2, color=GOLD, stroke_width=3).shift(UP * (1.2 + i * 0.08) + LEFT * 0.1) for i in range(3)])
    return VGroup(cup, sp, warm)


def thermometer():
    tube = RoundedRectangle(width=0.24, height=2.0, corner_radius=0.08, color=CREAM, stroke_width=4).set_fill("#17232a", opacity=1)
    bulb = Circle(radius=0.28, color=CREAM, stroke_width=4).set_fill(ORANGE, opacity=0.95).next_to(tube, DOWN, buff=-0.12)
    mercury = Rectangle(width=0.09, height=1.2, stroke_width=0).set_fill(ORANGE, opacity=0.95).move_to(tube.get_center() + DOWN * 0.28)
    return VGroup(tube, bulb, mercury).rotate(-0.12)


def wiggle_particles():
    cool = particle_grid("solid").scale(0.8).shift(LEFT * 2.1)
    warm = particle_grid("liquid").scale(0.9).shift(RIGHT * 1.6)
    return VGroup(cool, warm, rounded_label("gentle wiggle").shift(LEFT * 2.1 + DOWN * 1.35), rounded_label("more motion", GOLD).shift(RIGHT * 1.6 + DOWN * 1.35))


def ice_cube():
    return VGroup(cube_icon(), rounded_label("solid water").scale(0.85).shift(DOWN * 1.15))


def puddle():
    e = Ellipse(width=2.2, height=0.42, color=TEAL, stroke_width=5).set_fill("#2b8798", opacity=0.55)
    glint = oval_arc(1.45, 0.22, PI, PI, CREAM, 3).shift(UP * 0.04)
    return VGroup(e, glint, rounded_label("liquid water").scale(0.85).shift(DOWN * 0.8))


def melting_arrow():
    return Arrow(LEFT * 0.8, RIGHT * 0.8, color=GOLD, stroke_width=6, buff=0.05)


def sugar_crystal():
    return VGroup(salt_chunks(), rounded_label("sugar").scale(0.75).shift(DOWN * 0.55))


def dissolving_dots():
    water = beaker(fill=True).scale(0.9)
    dots = VGroup(*[Dot(radius=0.055, color="#f7d790").shift(RIGHT * (-0.35 + (i % 4) * 0.23) + DOWN * (0.25 + (i // 4) * 0.18)) for i in range(12)])
    return VGroup(water, dots)


def property_table(labels):
    row = VGroup()
    for i, label in enumerate(labels[:4]):
        box = RoundedRectangle(width=1.35, height=0.52, corner_radius=0.08, color=[TEAL, GOLD, GREEN, ORANGE][i % 4], stroke_width=3)
        box.set_fill("#061316", opacity=0.75)
        txt = Text(label[:14], color=CREAM, font_size=16, weight=BOLD).move_to(box.get_center())
        row.add(VGroup(box, txt))
    row.arrange(RIGHT, buff=0.18)
    return row


def state_triptych():
    return VGroup(cube_icon().scale(0.8).shift(LEFT * 2.4), beaker(fill=True).scale(0.75), balloon_icon().scale(0.75).shift(RIGHT * 2.3))


def jelly_icon():
    top = oval_arc(1.4, 0.45, 0, PI, "#f5a1c4", 4)
    body = Polygon(LEFT * 0.7, RIGHT * 0.7, RIGHT * 0.46 + DOWN * 0.6, LEFT * 0.46 + DOWN * 0.6, color="#f5a1c4", stroke_width=4).set_fill("#f5a1c4", opacity=0.35)
    return VGroup(top, body)


def sponge_icon():
    rect = RoundedRectangle(width=1.3, height=0.75, corner_radius=0.12, color=GOLD, stroke_width=3).set_fill("#d9a538", opacity=0.8)
    holes = VGroup(*[Circle(radius=0.07, color="#6e4d22", stroke_width=1).set_fill("#6e4d22", opacity=0.9).shift(RIGHT * (-0.35 + (i % 3) * 0.35) + UP * (-0.18 + (i // 3) * 0.28)) for i in range(6)])
    return VGroup(rect, holes)


def oval_arc(width, height, start_angle, angle, color, stroke_width):
    arc = Arc(start_angle=start_angle, angle=angle, color=color, stroke_width=stroke_width)
    arc.stretch_to_fit_width(width)
    arc.stretch_to_fit_height(height)
    return arc


def generate_cards(out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    for number in range(6, 12):
        img = Image.new("RGB", (452, 300), "#eef6f4")
        draw = ImageDraw.Draw(img, "RGBA")
        for radius, colour, pos in [(130, "#dfeaf7", (-55, -40)), (150, "#f7efe2", (250, 55)), (110, "#e0f4ed", (65, 210))]:
            layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
            ld = ImageDraw.Draw(layer)
            ld.ellipse([pos[0], pos[1], pos[0] + radius, pos[1] + radius], fill=colour + "65")
            img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
            draw = ImageDraw.Draw(img, "RGBA")
        draw.ellipse([150, 215, 302, 248], fill=(25, 32, 34, 20))
        if number == 6:
            draw_cube_card(draw, 170, 88, "#d8ece3", "#263f67")
            draw.rounded_rectangle([244, 116, 312, 146], radius=15, fill="#d9813e")
            draw.ellipse([318, 92, 338, 112], fill="#55bdd0")
            draw.ellipse([116, 154, 136, 174], fill="#69c87a")
        elif number == 7:
            draw_cube_card(draw, 105, 101, "#d8ece3", "#263f67", 0.82)
            draw_beaker_card(draw, 205, 62)
            draw.ellipse([315, 82, 374, 141], fill=(85, 189, 208, 78), outline="#55bdd0", width=8)
            draw.polygon([(343, 144), (352, 160), (333, 160)], fill="#55bdd0")
        elif number == 8:
            draw_particle_set(draw, 92, 94, "solid")
            draw_particle_set(draw, 216, 95, "liquid")
            draw_particle_set(draw, 327, 82, "gas")
        elif number == 9:
            draw_beaker_card(draw, 138, 72)
            draw.line([230, 150, 310, 135], fill="#f5f0e8", width=9)
            draw.ellipse([300, 119, 354, 151], outline="#f5f0e8", width=7, fill="#f2f4f0")
            draw.line([245, 82, 245, 180], fill="#d9813e", width=8)
            draw.ellipse([232, 170, 258, 196], fill="#d9813e")
            draw.arc([178, 42, 230, 96], 210, 330, fill="#d6a03a", width=5)
        elif number == 10:
            draw_cube_card(draw, 117, 85, "#e2f3fb", "#7fcbd8", 0.78)
            draw.line([210, 148, 260, 148], fill="#d6a03a", width=6)
            draw.polygon([(260, 148), (247, 139), (247, 157)], fill="#d6a03a")
            draw.ellipse([286, 146, 382, 178], outline="#55bdd0", width=8, fill=(85, 189, 208, 56))
        else:
            draw_beaker_card(draw, 140, 65)
            for xy in [(90, 92), (116, 120), (82, 140), (118, 157)]:
                draw.rectangle([xy[0], xy[1], xy[0] + 22, xy[1] + 22], fill="#f5f0e8", outline="#e4ddca", width=2)
            draw_particle_set(draw, 285, 94, "gas", "#d9813e")
        img.save(out / f"chapter-{number:02d}-card.png")


def draw_cube_card(draw, x, y, left, right, scale=1.0):
    w = int(74 * scale)
    h = int(60 * scale)
    draw.polygon([(x, y + 23), (x + w, y - 8), (x + w, y + h), (x, y + h + 28)], fill=left, outline="white", width=2)
    draw.polygon([(x + w, y - 8), (x + w + 70 * scale, y + 24), (x + w + 70 * scale, y + h + 30), (x + w, y + h)], fill=right, outline="white", width=2)
    draw.polygon([(x, y + 23), (x + 68 * scale, y - 15), (x + w + 70 * scale, y + 24), (x + w, y - 8)], fill="#eef7ef", outline="white", width=2)


def draw_beaker_card(draw, x, y):
    draw.line([x, y, x + 20, y + 106], fill="#55bdd0", width=7)
    draw.line([x + 82, y, x + 60, y + 106], fill="#55bdd0", width=7)
    draw.ellipse([x - 3, y - 9, x + 85, y + 9], outline="#55bdd0", width=7)
    draw.arc([x + 17, y + 95, x + 63, y + 119], 0, 180, fill="#55bdd0", width=7)
    draw.arc([x + 13, y + 72, x + 67, y + 96], 0, 180, fill="#d9813e", width=7)


def draw_particle_set(draw, x, y, kind, colour="#71bdd0"):
    coords = []
    if kind == "solid":
        coords = [(x + c * 18, y + r * 18) for r in range(4) for c in range(5)]
    elif kind == "liquid":
        coords = [(x + (i % 3) * 22 + (i // 3 % 2) * 8, y + (i // 3) * 20) for i in range(9)]
    else:
        coords = [(x, y), (x + 48, y + 26), (x + 96, y - 5), (x + 26, y + 82), (x + 88, y + 75)]
    for cx, cy in coords:
        draw.ellipse([cx, cy, cx + 15, cy + 15], fill=colour, outline="#f9ffff", width=2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["cards"], help="Utility command.")
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    if args.command == "cards":
        generate_cards(args.out)


if __name__ == "__main__":
    main()
