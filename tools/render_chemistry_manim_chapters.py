import argparse
import math
import os
import re
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
            ("Cooling", ["heat moves away", "motion slows"], "careful model"),
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
            ("Other materials", ["butter", "chocolate"], "app visuals only"),
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


def parse_vtt_time(value):
    hours, minutes, rest = value.split(":")
    seconds, millis = rest.split(".")
    return int(hours) * 3600 + int(minutes) * 60 + int(seconds) + int(millis) / 1000


def load_caption_durations(chapter_number):
    path = Path(__file__).resolve().parents[1] / "chemistry-training" / "chemistry-101-winter-2026" / "assets" / "captions" / f"chapter-{chapter_number:02d}.vtt"
    if not path.exists():
        return []
    durations = []
    for line in path.read_text(encoding="utf-8").splitlines():
        match = re.match(r"^(\d\d:\d\d:\d\d\.\d\d\d)\s+-->\s+(\d\d:\d\d:\d\d\.\d\d\d)", line.strip())
        if match:
            durations.append(max(0.5, parse_vtt_time(match.group(2)) - parse_vtt_time(match.group(1))))
    return durations


def extend_beats_for_captions(beats, target_count):
    expanded = list(beats)
    if target_count <= len(expanded):
        return expanded
    templates = [
        ("Practice transfer", ["new example", "same idea", "update answer"], "training, not memorising"),
        ("Repair answer", ["weak answer", "better answer"], "use evidence language"),
        ("Connect again", ["main clues", "model words"], "compare carefully"),
        ("Before the test", ["exact wording", "reject traps"], "ready for quiz"),
        ("Transfer check", ["new case", "same rule"], "explain why"),
        ("Final pause", ["say it yourself", "test a new example"], "ready for test"),
    ]
    index = 0
    while len(expanded) < target_count:
        expanded.append(templates[index % len(templates)])
        index += 1
    return expanded


class ChemistryManimScene(Scene):
    chapter_number = 6

    def construct(self):
        spec = CHAPTERS[self.chapter_number]
        config.background_color = BG
        self.camera.background_color = BG
        duration = float(os.environ.get("BQ_CHAPTER_DURATION", "330"))
        cue_durations = load_caption_durations(self.chapter_number)
        beats = extend_beats_for_captions(spec["beats"], len(cue_durations))
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
        if self.chapter_number >= 7:
            self.add(bench)
            self.wait(0.12)
        else:
            self.play(FadeIn(bench), run_time=0.8)
        self.add(bench_motion(self))
        if self.chapter_number < 7:
            self.add(teaching_motion_layer(self))

        if self.chapter_number < 7:
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
            beat_duration = cue_durations[index] if index < len(cue_durations) else beat_len
            remaining = max(0.2, beat_duration - 2.0)
            active_teaching_hold(self, visual, panel, remaining, self.chapter_number, index)

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


def active_teaching_hold(scene, visual, panel, duration, chapter=None, index=None):
    if chapter and chapter >= 7:
        directed_teaching_hold(scene, visual, panel, duration)
        return
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


def directed_teaching_hold(scene, visual, panel, duration):
    motion = getattr(visual, "bq_motion", "pulse")
    base = np.array(visual.get_center()) + np.array([0.0, -1.42, 0.0])
    base[0] = max(-2.9, min(2.0, base[0]))
    base[1] = max(-2.18, min(-1.2, base[1]))
    focus = VGroup(
        Circle(radius=0.16, color=GREEN, stroke_width=3).set_opacity(0.9),
        Dot(radius=0.055, color=GREEN),
    ).move_to(base + LEFT * 0.7)
    focus.set_z_index(20)
    scene.add(focus)
    remaining = duration
    cycle = 0
    while remaining > 0.05:
        run_time = min(2.6, remaining)
        focus_target = base + np.array([-0.85 + (cycle % 5) * 0.42, 0.08 * ((cycle % 2) * 2 - 1), 0.0])
        focus_move = focus.animate.move_to(focus_target)
        panel_color = [TEAL, GOLD, GREEN][cycle % 3]
        panel_move = panel[0].animate.set_stroke(panel_color, width=4.2)
        horizontal = RIGHT * (0.34 if cycle % 2 == 0 else -0.34)
        vertical = UP * (0.18 if cycle % 2 == 0 else -0.18)
        visual_pulse = visual.animate.scale(1.035)
        if motion == "block":
            scene.play(visual.animate.shift(horizontal * 1.55).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "pour":
            scene.play(visual.animate.shift(vertical * 1.15).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "gas":
            scene.play(visual.animate.shift(horizontal * 1.4).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "sort":
            scene.play(visual.animate.shift(vertical * 1.15).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "dots":
            scene.play(visual.animate.shift(horizontal * 1.15).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "heat":
            scene.play(visual.animate.shift(horizontal * 1.35).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "melt":
            scene.play(visual.animate.shift(horizontal * 1.35).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        elif motion == "dissolve":
            scene.play(visual.animate.shift(horizontal * 1.15).scale(1.035), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        else:
            scene.play(visual_pulse, panel[1].animate.set_color(GOLD).scale(1.04), focus_move, panel_move, rate_func=there_and_back, run_time=run_time)
        remaining -= run_time
        cycle += 1
    scene.remove(focus)


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
        if index == 0:
            return mark_motion(state_lab_overview(), "sort")
        if index == 1:
            return mark_motion(block_shape_visual(), "block")
        if index == 2:
            return mark_motion(liquid_pour_visual(), "pour")
        if index == 3:
            return mark_motion(gas_push_visual(), "gas")
        if index == 4:
            return mark_motion(tricky_lane_visual(), "sort")
        if index == 5:
            return mark_motion(state_label_reveal_visual(), "sort")
        if index == 6:
            return mark_motion(vapour_mist_visual(), "gas")
        if index == 7:
            return mark_motion(state_sort_visual(), "sort")
        return mark_motion(state_checkpoint_visual(), "sort")
    if chapter == 8:
        return mark_motion(particle_chapter_visual(index), "dots")
    if chapter == 9:
        return mark_motion(heat_chapter_visual(index), "heat")
    if chapter == 10:
        return mark_motion(melting_chapter_visual(index), "melt")
    return mark_motion(dissolving_chapter_visual(index), "dissolve")


def mark_motion(group, motion):
    group.bq_motion = motion
    return group


def small_label(text, color=TEAL, font_size=17):
    label = Text(text, color=CREAM, font_size=font_size, weight=BOLD)
    box = RoundedRectangle(width=max(1.05, label.width + 0.3), height=0.36, corner_radius=0.07, color=color, stroke_width=1.4)
    box.set_fill("#061316", opacity=0.94)
    return VGroup(box, label.move_to(box.get_center()))


def evidence_card(title, subtitle="", color=TEAL, width=1.75, height=0.92):
    box = RoundedRectangle(width=width, height=height, corner_radius=0.12, color=color, stroke_width=2.4)
    box.set_fill("#07191d", opacity=0.93)
    main = Text(title, color=CREAM, font_size=16, weight=BOLD)
    lines = [main]
    if subtitle:
        sub = Text(subtitle, color=MUTED, font_size=12)
        lines.append(sub)
    content = VGroup(*lines).arrange(DOWN, buff=0.08)
    content.move_to(box.get_center())
    return VGroup(box, content)


def safety_stamp(text, color=ORANGE):
    icon = RoundedRectangle(width=2.05, height=0.48, corner_radius=0.1, color=color, stroke_width=2.5)
    icon.set_fill("#21110d", opacity=0.94)
    return VGroup(icon, Text(text, color=CREAM, font_size=16, weight=BOLD).move_to(icon.get_center()))


def model_box(title, content, width=2.2, height=1.78, color=TEAL):
    box = RoundedRectangle(width=width, height=height, corner_radius=0.12, color=color, stroke_width=2.4)
    box.set_fill("#061316", opacity=0.88)
    head = Text(title, color=color, font_size=17, weight=BOLD).next_to(box, UP, buff=0.08)
    content.move_to(box.get_center())
    return VGroup(box, content, head)


def state_lab_overview():
    tray = RoundedRectangle(width=2.0, height=0.34, corner_radius=0.08, color="#7f5535", stroke_width=0).set_fill("#7f5535", opacity=1)
    block = cube_icon().scale(0.55).next_to(tray, UP, buff=0.02)
    station1 = VGroup(tray, block).shift(LEFT * 3.0)
    cup = beaker(fill=True).scale(0.65)
    station2 = VGroup(cup, small_label("water", TEAL).scale(0.75).next_to(cup, DOWN, buff=0.08))
    balloon = clearer_balloon().scale(0.72)
    plunger = plunger_chamber().scale(0.55).next_to(balloon, DOWN, buff=0.15)
    station3 = VGroup(balloon, plunger).shift(RIGHT * 3.0)
    no = Text("No labels yet", color=GOLD, font_size=25, weight=BOLD).shift(UP * 1.65)
    return VGroup(no, station1, station2, station3)


def block_shape_visual():
    tray = RoundedRectangle(width=1.75, height=0.34, corner_radius=0.08, color="#7f5535", stroke_width=0).set_fill("#7f5535", opacity=1)
    block = cube_icon().scale(0.58).next_to(tray, UP, buff=0.03)
    start = VGroup(tray, block, small_label("tray", MUTED).scale(0.7).next_to(tray, DOWN, buff=0.08)).shift(LEFT * 2.15)
    box = RoundedRectangle(width=1.5, height=1.15, corner_radius=0.08, color=TEAL, stroke_width=3).set_fill(TEAL, opacity=0.08).shift(RIGHT * 1.25)
    ghost = cube_icon().scale(0.58).set_opacity(0.28).move_to(box.get_center())
    arrow = Arrow(LEFT * 0.85, RIGHT * 0.35, color=GOLD, stroke_width=5, buff=0.05)
    reject = VGroup(Arrow(LEFT * 0.6 + DOWN * 1.15, RIGHT * 0.35 + DOWN * 1.35, color=ORANGE, stroke_width=4, buff=0.05), small_label("not pouring", ORANGE).scale(0.75).shift(DOWN * 1.65))
    return VGroup(start, arrow, box, ghost, reject, small_label("shape stays", GREEN).shift(RIGHT * 1.25 + DOWN * 0.92))


def liquid_pour_visual():
    tall = beaker(fill=True).scale(0.62).rotate(-0.18).shift(LEFT * 2.2 + UP * 0.18)
    bowl = Ellipse(width=2.0, height=0.55, color=TEAL, stroke_width=5).set_fill("#2b8798", opacity=0.35).shift(RIGHT * 1.45 + DOWN * 0.42)
    stream = VMobject(color=TEAL, stroke_width=7).set_points_smoothly([LEFT * 1.55 + UP * 0.08, LEFT * 0.25 + DOWN * 0.36, RIGHT * 0.75 + DOWN * 0.42])
    marker = VGroup(
        small_label("same amount", GREEN).scale(0.76).shift(DOWN * 1.35),
        Line(LEFT * 2.35 + DOWN * 0.86, RIGHT * 2.15 + DOWN * 0.86, color=GREEN, stroke_width=3),
    )
    return VGroup(tall, stream, bowl, marker, small_label("shape changes", GOLD).shift(RIGHT * 1.45 + UP * 0.48))


def gas_push_visual():
    balloon = clearer_balloon().scale(0.75).shift(LEFT * 2.2 + UP * 0.28)
    grow = Circle(radius=0.88, color=TEAL, stroke_width=2).set_opacity(0.28).move_to(balloon.get_center())
    plunger = plunger_chamber().scale(0.92).shift(RIGHT * 1.5)
    push = VGroup(
        Arrow(RIGHT * 2.8, RIGHT * 1.95, color=GOLD, stroke_width=5, buff=0.05),
        Arrow(RIGHT * 1.1, RIGHT * 0.55, color=GREEN, stroke_width=5, buff=0.05),
        small_label("pushes back", GREEN).scale(0.82).shift(RIGHT * 1.55 + DOWN * 1.1),
    )
    return VGroup(balloon, grow, plunger, push, small_label("air takes space", TEAL).shift(UP * 1.45))


def tricky_lane_visual():
    lanes = VGroup()
    for i, name in enumerate(["solid", "liquid", "gas", "tricky"]):
        lane = RoundedRectangle(width=1.32, height=1.55, corner_radius=0.12, color=[TEAL, BLUE, GOLD, ORANGE][i], stroke_width=2)
        lane.set_fill("#061316", opacity=0.72)
        lanes.add(VGroup(lane, Text(name, color=CREAM, font_size=15, weight=BOLD).next_to(lane, DOWN, buff=0.08)))
    lanes.arrange(RIGHT, buff=0.18).shift(DOWN * 0.42)
    jelly = VGroup(jelly_icon().scale(0.58), small_label("jelly", ORANGE).scale(0.72)).arrange(DOWN, buff=0.05).shift(LEFT * 2.15 + UP * 1.16)
    sponge = VGroup(sponge_icon().scale(0.58), small_label("sponge", ORANGE).scale(0.72)).arrange(DOWN, buff=0.05).shift(RIGHT * 2.15 + UP * 1.16)
    arrows = VGroup(Arrow(jelly.get_bottom(), lanes[3].get_top(), color=ORANGE, buff=0.08), Arrow(sponge.get_bottom(), lanes[3].get_top(), color=ORANGE, buff=0.08))
    return VGroup(lanes, jelly, sponge, arrows, small_label("one clue is not enough", GOLD).shift(UP * 1.65))


def state_label_reveal_visual():
    states = VGroup()
    specs = [("solid", cube_icon().scale(0.55), "keeps shape"), ("liquid", beaker(fill=True).scale(0.55), "flows"), ("gas", clearer_balloon().scale(0.55), "spreads")]
    for title, icon, clue in specs:
        group = VGroup(icon, small_label(title, GREEN), Text(clue, color=MUTED, font_size=15)).arrange(DOWN, buff=0.08)
        states.add(group)
    states.arrange(RIGHT, buff=0.85)
    return VGroup(states, small_label("labels follow evidence", GOLD).shift(UP * 1.6))


def vapour_mist_visual():
    ribbon = safety_stamp("app/adult only", ORANGE).shift(UP * 1.62 + LEFT * 1.95)
    cup = beaker(fill=True).scale(0.58).shift(LEFT * 1.65 + DOWN * 0.22)
    invisible = VGroup(
        Arrow(LEFT * 1.55 + UP * 0.45, LEFT * 1.55 + UP * 1.15, color=TEAL, stroke_width=4),
        Arrow(LEFT * 1.2 + UP * 0.5, LEFT * 0.9 + UP * 1.15, color=TEAL, stroke_width=4),
        small_label("vapour: invisible gas", TEAL).scale(0.72).shift(LEFT * 1.15 + UP * 1.35),
    )
    droplets = VGroup(*[Dot(radius=0.055, color="#b8e9ef").shift(RIGHT * 1.1 + UP * (0.35 + 0.18 * (i % 3)) + RIGHT * (0.18 * i)) for i in range(7)])
    mist = VGroup(droplets, small_label("mist: liquid droplets", BLUE).scale(0.72).shift(RIGHT * 1.75 + UP * 1.08))
    return VGroup(ribbon, cup, invisible, mist)


def state_sort_visual():
    lanes = VGroup()
    for i, name in enumerate(["solid", "liquid", "gas", "tricky"]):
        lane = RoundedRectangle(width=1.35, height=1.34, corner_radius=0.12, color=[TEAL, BLUE, GOLD, ORANGE][i], stroke_width=2)
        lane.set_fill("#061316", opacity=0.78)
        lanes.add(VGroup(lane, Text(name, color=CREAM, font_size=15, weight=BOLD).next_to(lane, DOWN, buff=0.08)))
    lanes.arrange(RIGHT, buff=0.18).shift(DOWN * 0.48)
    cards = VGroup(
        evidence_card("ice", "keeps shape", TEAL, 1.1, 0.72),
        evidence_card("juice", "flows", BLUE, 1.1, 0.72),
        evidence_card("air tyre", "fills", GOLD, 1.2, 0.72),
        evidence_card("honey", "slow flow", BLUE, 1.25, 0.72),
        evidence_card("foam", "what part?", ORANGE, 1.25, 0.72),
    ).arrange(RIGHT, buff=0.12).shift(UP * 1.12)
    return VGroup(cards, lanes, small_label("sort by behaviour", GREEN).shift(UP * 1.72))


def state_checkpoint_visual():
    qs = VGroup(
        evidence_card("own shape?", "", TEAL, 1.55, 0.7),
        evidence_card("flows?", "", BLUE, 1.28, 0.7),
        evidence_card("spreads?", "", GOLD, 1.42, 0.7),
    ).arrange(RIGHT, buff=0.22).shift(UP * 0.75)
    example = VGroup(clearer_balloon().scale(0.48), small_label("air in ball", GOLD).scale(0.72)).arrange(DOWN, buff=0.06).shift(DOWN * 0.55)
    pointer = Arrow(LEFT * 1.2 + DOWN * 0.16, example.get_top(), color=GREEN, stroke_width=4, buff=0.1)
    return VGroup(qs, example, pointer, small_label("guided checkpoint", GREEN).shift(UP * 1.55))


def particle_chapter_visual(index):
    if index == 0:
        return model_gate_visual()
    if index == 1:
        cards = VGroup(evidence_card("keeps shape", "solid", TEAL), evidence_card("pours", "liquid", BLUE), evidence_card("fills space", "gas", GOLD)).arrange(RIGHT, buff=0.22)
        return VGroup(cards, small_label("evidence first", GREEN).shift(UP * 1.45))
    if index == 2:
        return particle_model_visual("solid", "fixed spots", "tiny vibration")
    if index == 3:
        return particle_model_visual("liquid", "close together", "slide past")
    if index == 4:
        return particle_model_visual("gas", "far apart", "fills space")
    if index == 5:
        wrong = VGroup(evidence_card("wet dots", "not this", ORANGE), evidence_card("tiny ice cubes", "not this", ORANGE), evidence_card("tiny balloons", "not this", ORANGE)).arrange(RIGHT, buff=0.18).shift(UP * 0.38)
        accepted = VGroup(evidence_card("spacing", "", GREEN, 1.25, 0.65), evidence_card("motion", "", GREEN, 1.2, 0.65), evidence_card("arrangement", "", GREEN, 1.55, 0.65)).arrange(RIGHT, buff=0.18).shift(DOWN * 0.95)
        crosses = VGroup(*[Cross(card[0], stroke_color=ORANGE, stroke_width=5).set_opacity(0.9) for card in wrong])
        return VGroup(wrong, crosses, accepted, small_label("model, not photograph", TEAL).shift(UP * 1.5))
    if index == 6:
        cards = VGroup(evidence_card("keeps shape", "", TEAL, 1.45, 0.65), evidence_card("pours", "", BLUE, 1.1, 0.65), evidence_card("fills space", "", GOLD, 1.35, 0.65)).arrange(DOWN, buff=0.14).shift(LEFT * 2.55)
        models = VGroup(particle_grid("solid").scale(0.65), particle_grid("liquid").scale(0.7), particle_grid("gas").scale(0.58)).arrange(DOWN, buff=0.25).shift(RIGHT * 1.3)
        lines = VGroup(*[Arrow(cards[i].get_right(), models[i].get_left(), color=[TEAL, BLUE, GOLD][i], stroke_width=3, buff=0.12) for i in range(3)])
        return VGroup(cards, models, lines, small_label("match evidence to model", GREEN).shift(UP * 1.55))
    if index == 7:
        return VGroup(model_box("model limit", VGroup(Text("colour helps us track", color=CREAM, font_size=20), Text("not real particle colour", color=MUTED, font_size=17)).arrange(DOWN, buff=0.15), 4.3, 1.75, GOLD), small_label("do not overbelieve", ORANGE).shift(DOWN * 1.25))
    return VGroup(particle_model_visual("solid", "close", "fixed").scale(0.72).shift(LEFT * 2.2), particle_model_visual("liquid", "close", "sliding").scale(0.72), particle_model_visual("gas", "spread", "moving").scale(0.72).shift(RIGHT * 2.2), small_label("model explains evidence", GREEN).shift(DOWN * 1.45))


def model_gate_visual():
    microscope = model_box("not photo", VGroup(Circle(radius=0.35, color=MUTED), Line(LEFT * 0.45, RIGHT * 0.45, color=MUTED).rotate(-0.75)), 1.75, 1.35, ORANGE).shift(LEFT * 1.6)
    cross = Cross(microscope[0], stroke_color=ORANGE, stroke_width=5)
    model = model_box("model", particle_grid("liquid").scale(0.78), 1.85, 1.35, TEAL).shift(RIGHT * 1.6)
    arrow = Arrow(LEFT * 0.35, RIGHT * 0.65, color=GOLD, stroke_width=4, buff=0.08)
    return VGroup(microscope, cross, arrow, model, small_label("dots are symbols", TEAL).shift(DOWN * 1.35))


def particle_model_visual(kind, line1, line2):
    title = {"solid": "solid model", "liquid": "liquid model", "gas": "gas model"}[kind]
    outline = {"solid": cube_icon().scale(0.62), "liquid": beaker(fill=False).scale(0.58), "gas": clearer_balloon().scale(0.58)}[kind].set_opacity(0.24)
    dots = particle_grid(kind).scale(0.92 if kind != "gas" else 0.8)
    box = model_box(title, VGroup(outline, dots), 3.0, 2.1, {"solid": TEAL, "liquid": BLUE, "gas": GOLD}[kind])
    note = VGroup(small_label(line1, TEAL).scale(0.78), small_label(line2, GOLD).scale(0.78)).arrange(RIGHT, buff=0.15).next_to(box, DOWN, buff=0.15)
    return VGroup(box, note)


def heat_chapter_visual(index):
    if index in (0, 1):
        return heat_contact_visual(correct=True)
    if index == 2:
        return thermometer_visual()
    if index == 3:
        return wrong_heat_beam_visual()
    if index == 4:
        return wiggle_particles_better()
    if index == 5:
        return cooling_visual()
    if index == 6:
        return heat_safety_visual()
    if index == 7:
        return heat_prediction_visual()
    return heat_checkpoint_visual()


def heat_contact_visual(correct=True):
    cup = beaker(fill=True).scale(0.75).shift(LEFT * 1.15)
    sp = spoon().scale(0.85).rotate(-0.1).shift(RIGHT * 0.18 + UP * 0.03)
    contact = Circle(radius=0.23, color=GOLD, stroke_width=5).set_fill(GOLD, opacity=0.25).shift(LEFT * 0.23 + DOWN * 0.1)
    path_label = small_label("contact path", GOLD).scale(0.78).shift(RIGHT * 0.65 + DOWN * 0.62)
    arrows = VGroup(
        Arrow(LEFT * 0.82 + DOWN * 0.18, LEFT * 0.38 + DOWN * 0.12, color=GOLD, stroke_width=5, buff=0.03),
        Arrow(LEFT * 0.34 + DOWN * 0.11, LEFT * 0.08 + DOWN * 0.08, color=GOLD, stroke_width=5, buff=0.02),
        Arrow(RIGHT * 0.08 + DOWN * 0.07, RIGHT * 0.62 + UP * 0.0, color=GOLD, stroke_width=5, buff=0.03),
        Arrow(RIGHT * 0.62 + UP * 0.0, RIGHT * 1.18 + UP * 0.08, color=GOLD, stroke_width=4, buff=0.03),
        path_label,
    )
    safety = safety_stamp("warm tap water only", GREEN).scale(0.72).shift(UP * 1.48 + LEFT * 1.8)
    return VGroup(safety, cup, sp, contact, arrows)


def thermometer_visual():
    t1 = thermometer().scale(0.72).shift(LEFT * 1.3)
    t2 = thermometer().scale(0.85).shift(RIGHT * 1.25)
    read = VGroup(evidence_card("cooler", "reading", BLUE, 1.45, 0.72).shift(LEFT * 1.3 + DOWN * 1.35), evidence_card("warmer", "reading", GOLD, 1.45, 0.72).shift(RIGHT * 1.25 + DOWN * 1.35))
    arrow = Arrow(LEFT * 0.25, RIGHT * 0.45, color=GOLD, stroke_width=4, buff=0.1)
    return VGroup(t1, t2, arrow, read, safety_stamp("warm tap water only", GREEN).scale(0.7).shift(UP * 1.5 + LEFT * 1.8))


def wrong_heat_beam_visual():
    base = heat_contact_visual()
    wrong = VGroup(Arrow(LEFT * 1.2 + UP * 0.95, RIGHT * 1.45 + UP * 0.95, color=ORANGE, stroke_width=6, buff=0.05), small_label("not a laser", ORANGE).shift(UP * 1.38 + RIGHT * 0.5))
    repair = small_label("arrow is a thinking symbol", GREEN).scale(0.75).shift(RIGHT * 0.75 + UP * 0.72)
    return VGroup(base, wrong, Cross(wrong[0], stroke_color=ORANGE, stroke_width=5), repair)


def wiggle_particles_better():
    cool = model_box("cooler", particle_grid("solid").scale(0.74), 2.25, 1.55, BLUE).shift(LEFT * 1.6)
    warm = model_box("warmer", particle_grid("liquid").scale(0.82), 2.25, 1.55, GOLD).shift(RIGHT * 1.6)
    trails = VGroup(*[Arc(radius=0.18 + i * 0.03, start_angle=0, angle=PI, color=GOLD, stroke_width=2).shift(RIGHT * 1.15 + UP * (-0.2 + i * 0.16)) for i in range(5)])
    return VGroup(cool, warm, trails, small_label("same dots, bigger wiggle", GREEN).shift(DOWN * 1.45))


def cooling_visual():
    warm = model_box("warm object", particle_grid("liquid").scale(0.74), 2.2, 1.55, GOLD).shift(LEFT * 1.25)
    cool = RoundedRectangle(width=1.7, height=1.45, corner_radius=0.12, color=BLUE, stroke_width=3).set_fill(BLUE, opacity=0.15).shift(RIGHT * 1.6)
    arrows = VGroup(Arrow(warm.get_right(), cool.get_left(), color=GOLD, stroke_width=5, buff=0.1), small_label("motion slows", BLUE).shift(DOWN * 1.35))
    return VGroup(warm, cool, arrows)


def heat_safety_visual():
    stamps = VGroup(safety_stamp("parent check", GREEN), safety_stamp("warm tap water", GREEN), safety_stamp("no boiling", ORANGE), safety_stamp("no flame", ORANGE)).arrange(DOWN, buff=0.15)
    return VGroup(stamps, small_label("safe setup first", GREEN).shift(UP * 1.65))


def heat_prediction_visual():
    setup = heat_contact_visual()
    wrong = Arrow(RIGHT * 1.05 + DOWN * 0.9, LEFT * 0.15 + DOWN * 0.9, color=ORANGE, stroke_width=5, buff=0.05)
    correct = Arrow(LEFT * 0.15 + DOWN * 0.55, RIGHT * 1.35 + DOWN * 0.55, color=GREEN, stroke_width=5, buff=0.05)
    return VGroup(setup, wrong, Cross(wrong, stroke_color=ORANGE, stroke_width=4), correct, small_label("warmer to cooler", GREEN).shift(DOWN * 1.45))


def heat_checkpoint_visual():
    cards = VGroup(evidence_card("warmer?", "", GOLD, 1.35, 0.72), evidence_card("cooler?", "", BLUE, 1.25, 0.72), evidence_card("pathway?", "", TEAL, 1.45, 0.72)).arrange(RIGHT, buff=0.22).shift(UP * 0.65)
    arrow = Arrow(LEFT * 1.4 + DOWN * 0.45, RIGHT * 1.45 + DOWN * 0.45, color=GREEN, stroke_width=5, buff=0.1)
    return VGroup(cards, arrow, small_label("then draw the arrow", GREEN).shift(DOWN * 1.1))


def melting_chapter_visual(index):
    if index == 0:
        return ice_observe_visual()
    if index in (1, 2):
        return melt_timeline_visual()
    if index == 3:
        return before_after_water_visual()
    if index == 4:
        return VGroup(particle_model_visual("solid", "fixed", "wiggle").scale(0.72).shift(LEFT * 1.8), Arrow(LEFT * 0.25, RIGHT * 0.55, color=GOLD, stroke_width=5), particle_model_visual("liquid", "sliding", "same water").scale(0.72).shift(RIGHT * 1.8))
    if index == 5:
        return freezing_reverse_visual()
    if index == 6:
        return other_materials_visual()
    if index == 7:
        return safe_ice_observation_visual()
    return melting_checkpoint_visual()


def ice_observe_visual():
    plate = Ellipse(width=2.5, height=0.55, color=CREAM, stroke_width=3).set_fill("#f0f7f8", opacity=0.12)
    ice = cube_icon().scale(0.72).shift(UP * 0.38)
    timer = VGroup(Circle(radius=0.34, color=GOLD, stroke_width=4), Text("0:00", color=GOLD, font_size=18, weight=BOLD)).shift(RIGHT * 2.2 + UP * 0.95)
    return VGroup(plate, ice, timer, small_label("observe first", TEAL).shift(DOWN * 1.25))


def melt_timeline_visual():
    ice = cube_icon().scale(0.62).shift(LEFT * 2.0 + UP * 0.2)
    soft = RoundedRectangle(width=1.2, height=0.82, corner_radius=0.24, color="#b8e9ef", stroke_width=4).set_fill("#cceef3", opacity=0.5)
    pudd = Ellipse(width=1.7, height=0.38, color=TEAL, stroke_width=5).set_fill("#2b8798", opacity=0.5).shift(RIGHT * 2.0 + DOWN * 0.15)
    arrows = VGroup(Arrow(LEFT * 1.15, LEFT * 0.28, color=GOLD, stroke_width=4), Arrow(RIGHT * 0.38, RIGHT * 1.25, color=GOLD, stroke_width=4))
    tag = small_label("material: water", GREEN).shift(DOWN * 1.2)
    timer = Text("time passes", color=GOLD, font_size=22, weight=BOLD).shift(UP * 1.35)
    return VGroup(timer, ice, arrows, soft, pudd, tag)


def before_after_water_visual():
    before = evidence_card("before", "solid water", TEAL, 1.75, 0.9).shift(LEFT * 1.55)
    after = evidence_card("after", "liquid water", BLUE, 1.75, 0.9).shift(RIGHT * 1.55)
    token = small_label("same material", GREEN).shift(DOWN * 1.2)
    return VGroup(before, after, Arrow(before.get_right(), after.get_left(), color=GOLD, stroke_width=4, buff=0.1), token)


def freezing_reverse_visual():
    tray = RoundedRectangle(width=1.7, height=0.72, corner_radius=0.12, color=TEAL, stroke_width=3).set_fill("#2b8798", opacity=0.28).shift(LEFT * 1.4)
    freezer = RoundedRectangle(width=1.75, height=1.25, corner_radius=0.1, color=BLUE, stroke_width=3).set_fill(BLUE, opacity=0.16).shift(RIGHT * 1.5)
    arrows = VGroup(Arrow(tray.get_right(), freezer.get_left(), color=GOLD, stroke_width=5, buff=0.1), small_label("heat moves away", GOLD).shift(DOWN * 1.25))
    return VGroup(tray, freezer, arrows, small_label("freezing reverse", BLUE).shift(UP * 1.38))


def other_materials_visual():
    cards = VGroup(evidence_card("butter", "solid to liquid", GOLD, 1.55, 0.82), evidence_card("chocolate", "solid to liquid", ORANGE, 1.75, 0.82)).arrange(RIGHT, buff=0.35)
    app = safety_stamp("app visuals only", GREEN).scale(0.82).shift(DOWN * 1.25)
    return VGroup(cards, app)


def safe_ice_observation_visual():
    items = VGroup(evidence_card("sealed bag", "ice", GREEN, 1.45, 0.78), evidence_card("plate", "", TEAL, 1.1, 0.78), evidence_card("timer", "", GOLD, 1.1, 0.78), evidence_card("notebook", "", BLUE, 1.35, 0.78)).arrange(RIGHT, buff=0.15)
    return VGroup(items, safety_stamp("parent nearby", GREEN).scale(0.82).shift(DOWN * 1.25))


def melting_checkpoint_visual():
    q = VGroup(evidence_card("material?", "water", TEAL, 1.55, 0.78), evidence_card("state now?", "liquid", BLUE, 1.55, 0.78), evidence_card("changed?", "state", GOLD, 1.55, 0.78)).arrange(RIGHT, buff=0.18)
    return VGroup(q, small_label("same material, new state", GREEN).shift(DOWN * 1.2))


def dissolving_chapter_visual(index):
    if index == 0:
        return dissolving_split_visual()
    if index == 1:
        return VGroup(melt_timeline_visual().scale(0.72).shift(LEFT * 1.45), small_label("melting = state change", TEAL).shift(RIGHT * 1.75))
    if index == 2:
        return sugar_setup_visual()
    if index == 3:
        return not_melting_visual()
    if index == 4:
        return dissolving_model_visual()
    if index == 5:
        return evidence_without_tasting_visual()
    if index == 6:
        return no_tasting_safety_visual()
    if index == 7:
        return melting_dissolving_table_visual()
    return dissolving_checkpoint_visual()


def dissolving_split_visual():
    divider = Line(UP * 1.55, DOWN * 1.25, color="#2d4b52", stroke_width=3)
    left = VGroup(cube_icon().scale(0.48), Ellipse(width=1.3, height=0.28, color=TEAL, stroke_width=3).shift(DOWN * 0.48), small_label("ice on plate", TEAL).scale(0.72).shift(DOWN * 0.92)).shift(LEFT * 1.75)
    right = VGroup(sugar_crystal().scale(0.58).shift(LEFT * 0.45), beaker(fill=True).scale(0.48).shift(RIGHT * 0.65), small_label("sugar in water", GOLD).scale(0.72).shift(DOWN * 0.92)).shift(RIGHT * 1.6)
    return VGroup(left, divider, right, small_label("similar look, different cause", GREEN).shift(UP * 1.55))


def sugar_setup_visual():
    ribbon = safety_stamp("known sugar only - no tasting", ORANGE).scale(0.72).shift(UP * 1.55 + LEFT * 1.5)
    sugar = sugar_crystal().scale(0.62).shift(LEFT * 1.8 + UP * 0.25)
    cup = beaker(fill=True).scale(0.72).shift(RIGHT * 0.95)
    stir = Arc(radius=0.62, start_angle=0.1, angle=1.5 * PI, color=GOLD, stroke_width=5).shift(RIGHT * 0.95 + UP * 0.05)
    arrow = Arrow(sugar.get_right(), cup.get_left(), color=TEAL, stroke_width=5, buff=0.08)
    return VGroup(ribbon, sugar, arrow, cup, stir)


def not_melting_visual():
    wrong = evidence_card("melted sugar?", "wrong label", ORANGE, 2.05, 0.82).shift(UP * 0.55)
    cross = Cross(wrong[0], stroke_color=ORANGE, stroke_width=5)
    correct = evidence_card("spread through water", "dissolving", GREEN, 2.35, 0.82).shift(DOWN * 0.65)
    return VGroup(wrong, cross, correct, Arrow(wrong.get_bottom(), correct.get_top(), color=GREEN, stroke_width=4, buff=0.1))


def dissolving_model_visual():
    water = VGroup(*[Dot(radius=0.07, color=TEAL).shift(RIGHT * (-0.75 + (i % 5) * 0.38) + UP * (-0.42 + (i // 5) * 0.32)) for i in range(15)])
    sugar = VGroup(*[Dot(radius=0.055, color=GOLD).shift(RIGHT * (-0.6 + (i % 4) * 0.42) + UP * (-0.25 + (i // 4) * 0.36)) for i in range(12)])
    frame = model_box("dissolving model", VGroup(water, sugar), 3.2, 2.25, TEAL)
    return VGroup(frame, small_label("sugar dots interleaved", GOLD).shift(DOWN * 1.45))


def evidence_without_tasting_visual():
    ok = VGroup(evidence_card("labelled model", "ok", GREEN, 1.65, 0.8), evidence_card("app scale", "ok", GREEN, 1.35, 0.8), evidence_card("app recovery", "ok", GREEN, 1.55, 0.8)).arrange(RIGHT, buff=0.16).shift(UP * 0.52)
    no = VGroup(evidence_card("tasting", "no", ORANGE, 1.25, 0.72), evidence_card("unknown jar", "no", ORANGE, 1.5, 0.72)).arrange(RIGHT, buff=0.18).shift(DOWN * 0.85)
    crosses = VGroup(*[Cross(card[0], stroke_color=ORANGE, stroke_width=4) for card in no])
    return VGroup(ok, no, crosses)


def no_tasting_safety_visual():
    stamps = VGroup(safety_stamp("no tasting", ORANGE), safety_stamp("no boiling", ORANGE), safety_stamp("parent supervised", GREEN), safety_stamp("known materials", GREEN)).arrange(DOWN, buff=0.14)
    return VGroup(stamps)


def melting_dissolving_table_visual():
    melt = evidence_card("melting", "state change", TEAL, 2.0, 0.9).shift(UP * 0.62)
    dissolv = evidence_card("dissolving", "spreading mixture", GOLD, 2.25, 0.9).shift(DOWN * 0.62)
    examples = VGroup(small_label("ice -> water", TEAL).scale(0.75).next_to(melt, RIGHT, buff=0.35), small_label("sugar + water", GOLD).scale(0.75).next_to(dissolv, RIGHT, buff=0.35))
    return VGroup(melt, dissolv, examples)


def dissolving_checkpoint_visual():
    cards = VGroup(evidence_card("not gone", "", GREEN, 1.35, 0.72), evidence_card("not melted", "", GREEN, 1.55, 0.72), evidence_card("spread out", "", GOLD, 1.45, 0.72)).arrange(RIGHT, buff=0.18)
    return VGroup(cards, small_label("dissolving is spreading through water", GOLD).shift(DOWN * 1.22))


def clearer_balloon():
    b = Circle(radius=0.65, color=TEAL, stroke_width=5).set_fill("#48bfd2", opacity=0.28)
    highlight = Arc(radius=0.38, start_angle=2.2, angle=0.9, color=CREAM, stroke_width=3).shift(UP * 0.16 + LEFT * 0.05)
    knot = Triangle(color=TEAL, stroke_width=2).set_fill(TEAL, opacity=0.7).scale(0.16).next_to(b, DOWN, buff=-0.03)
    string = Line(knot.get_bottom(), knot.get_bottom() + DOWN * 0.55, color=TEAL, stroke_width=2)
    return VGroup(b, highlight, knot, string)


def plunger_chamber():
    tube = RoundedRectangle(width=1.85, height=0.62, corner_radius=0.12, color=CREAM, stroke_width=4).set_fill("#173034", opacity=0.78)
    air = RoundedRectangle(width=0.82, height=0.46, corner_radius=0.08, color=TEAL, stroke_width=0).set_fill(TEAL, opacity=0.28).move_to(tube.get_center() + LEFT * 0.32)
    rod = Line(tube.get_right(), tube.get_right() + RIGHT * 0.65, color=CREAM, stroke_width=6)
    knob = Circle(radius=0.16, color=CREAM, stroke_width=2).set_fill(CREAM, opacity=0.95).next_to(rod, RIGHT, buff=-0.02)
    return VGroup(tube, air, rod, knob)


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
