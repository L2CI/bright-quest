import argparse
import json
import math
import os
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from manim import *


ROOT = Path(__file__).resolve().parents[1]
COURSE_DIR = ROOT / "chemistry-training" / "chemistry-101-winter-2026"
BG = "#071316"
BOARD = "#0b2226"
CREAM = "#f5f1e8"
MUTED = "#a8bac0"
TEAL = "#67d2d8"
GOLD = "#f2bd55"
ORANGE = "#e98445"
GREEN = "#72d38a"
BLUE = "#78b9ff"
ROSE = "#f18aa8"
RED = "#ef6a72"

THEMES = {
    8: {"accent": TEAL, "secondary": BLUE, "label": "MODEL LAB"},
    9: {"accent": ORANGE, "secondary": GOLD, "label": "HEAT LAB"},
    10: {"accent": BLUE, "secondary": TEAL, "label": "STATE LAB"},
    11: {"accent": GREEN, "secondary": ROSE, "label": "SOLUTION LAB"},
}


def timeline_for(chapter):
    path = COURSE_DIR / "assets" / "timelines" / f"chapter-{chapter:02d}.json"
    return json.loads(path.read_text(encoding="utf-8"))


def fit_text(value, size=34, max_width=11.2, color=CREAM, weight=BOLD):
    text = Text(str(value), font_size=size, color=color, weight=weight)
    if text.width > max_width:
        text.scale_to_fit_width(max_width)
    return text


def chalk_label(value, color=CREAM, size=28):
    return fit_text(value, size=size, max_width=4.8, color=color, weight=BOLD)


def board_shell(chapter, title):
    theme = THEMES[chapter]
    frame = RoundedRectangle(width=13.55, height=7.25, corner_radius=0.18, stroke_color="#31525a", stroke_width=2)
    frame.set_fill(BOARD, opacity=0.98)
    top_line = Line(LEFT * 6.25, RIGHT * 6.25, color="#31525a", stroke_width=2).shift(UP * 2.57)
    lab = Text(theme["label"], font_size=22, color=theme["accent"], weight=BOLD).to_corner(UL, buff=0.48)
    heading = fit_text(title, size=38, max_width=8.4).to_edge(UP, buff=0.36).shift(RIGHT * 0.55)
    return VGroup(frame, top_line, lab, heading)


def progress_rail(chapter, index, total):
    theme = THEMES[chapter]
    rail = RoundedRectangle(width=10.8, height=0.13, corner_radius=0.06, stroke_width=0).set_fill("#294349", 1)
    rail.to_edge(DOWN, buff=0.32)
    width = 10.8 * ((index + 1) / total)
    fill = RoundedRectangle(width=max(0.18, width), height=0.13, corner_radius=0.06, stroke_width=0).set_fill(theme["accent"], 1)
    fill.align_to(rail, LEFT).move_to(rail.get_left() + RIGHT * width / 2)
    marker = Dot(radius=0.075, color=theme["secondary"]).move_to(fill.get_right())
    return VGroup(rail, fill, marker)


def system_boundary(width=6.3, height=4.1, color=TEAL):
    box = RoundedRectangle(width=width, height=height, corner_radius=0.22, color=color, stroke_width=4)
    box.set_fill("#0c1d22", opacity=0.55)
    return box


def particle_grid(rows=4, cols=6, spacing=0.43, color=TEAL, radius=0.085):
    dots = VGroup()
    for row in range(rows):
        for col in range(cols):
            dots.add(Dot(radius=radius, color=color).shift(RIGHT * (col - (cols - 1) / 2) * spacing + UP * (row - (rows - 1) / 2) * spacing))
    return dots


def particle_cloud(count=18, width=4.7, height=2.9, color=TEAL, seed=8):
    rng = np.random.default_rng(seed)
    dots = VGroup()
    for _ in range(count):
        dots.add(Dot(radius=0.085, color=color).move_to([rng.uniform(-width / 2, width / 2), rng.uniform(-height / 2, height / 2), 0]))
    return dots


def beaker(width=2.2, height=2.8, liquid=BLUE):
    left = Line(LEFT * width / 2 + UP * height / 2, LEFT * width * 0.36 + DOWN * height / 2, color=CREAM, stroke_width=5)
    right = Line(RIGHT * width / 2 + UP * height / 2, RIGHT * width * 0.36 + DOWN * height / 2, color=CREAM, stroke_width=5)
    rim = Ellipse(width=width, height=0.27, color=CREAM, stroke_width=5).shift(UP * height / 2)
    base = ArcBetweenPoints(left.get_end(), right.get_end(), angle=-PI / 3, color=CREAM, stroke_width=5)
    fill = RoundedRectangle(width=width * 0.72, height=height * 0.46, corner_radius=0.18, stroke_width=0).set_fill(liquid, opacity=0.46).shift(DOWN * height * 0.22)
    return VGroup(fill, left, right, rim, base)


def thermometer(value=20, color=ORANGE):
    stem = RoundedRectangle(width=0.34, height=2.5, corner_radius=0.17, color=CREAM, stroke_width=4)
    level_height = 0.65 + 1.25 * max(0, min(1, (value - 5) / 45))
    level = RoundedRectangle(width=0.16, height=level_height, corner_radius=0.08, stroke_width=0).set_fill(color, 1)
    level.align_to(stem, DOWN).shift(UP * 0.17)
    bulb = Circle(radius=0.31, color=CREAM, stroke_width=4).set_fill(color, 1).next_to(stem, DOWN, buff=-0.17)
    reading = Text(f"{value} C", font_size=28, color=color, weight=BOLD).next_to(stem, RIGHT, buff=0.34)
    return VGroup(stem, level, bulb, reading)


def cube(color=BLUE):
    front = Square(side_length=1.45, color=color, stroke_width=5).set_fill(color, 0.18)
    top = Polygon(front.get_corner(UL), front.get_corner(UR), front.get_corner(UR) + UP * 0.45 + LEFT * 0.45, front.get_corner(UL) + UP * 0.45 + LEFT * 0.45, color=CREAM, stroke_width=3).set_fill(CREAM, 0.08)
    side = Polygon(front.get_corner(UL), front.get_corner(DL), front.get_corner(DL) + LEFT * 0.45 + UP * 0.45, front.get_corner(UL) + LEFT * 0.45 + UP * 0.45, color=TEAL, stroke_width=3).set_fill(TEAL, 0.12)
    return VGroup(front, top, side)


def arrow_label(start, end, text, color=GOLD):
    arrow = Arrow(start, end, buff=0.08, color=color, stroke_width=6, max_tip_length_to_length_ratio=0.16)
    label = chalk_label(text, color=color, size=24).next_to(arrow, UP, buff=0.12)
    return VGroup(arrow, label)


def question_card(prompt, choices=None):
    card = RoundedRectangle(width=10.4, height=3.9, corner_radius=0.24, color=GOLD, stroke_width=4).set_fill("#10272c", 0.96)
    q = fit_text(prompt, size=36, max_width=9.4, color=CREAM).move_to(card.get_top() + DOWN * 0.72)
    group = VGroup(card, q)
    if choices:
        labels = VGroup(*[
            RoundedRectangle(width=4.3, height=0.72, corner_radius=0.14, color=TEAL, stroke_width=2).set_fill("#16343a", 0.9)
            for _ in choices
        ]).arrange_in_grid(rows=2, cols=2, buff=0.34)
        for box, value in zip(labels, choices):
            label = fit_text(value, size=23, max_width=3.8, color=CREAM).move_to(box)
            box.add(label)
        labels.move_to(card.get_center() + DOWN * 0.62)
        group.add(labels)
    return group


def classify_kind(chapter, scene_id, title, index):
    authored = {
        8: ["evidence_bench", "solid_particles", "liquid_evidence_model", "gas_particles", "compression_compare", "scent_diffusion", "food_colouring", "concentration_spread", "cup_prediction", "model_contract", "model_limits", "particle_claim_repairs", "bag_compression_compare", "diffusion_fair_test", "evidence_match"],
        9: ["spoon_touch", "thermometer", "heat_path", "conduction", "material_compare", "heat_particles", "cooling_paths", "cooling_graph", "cooling_change_graph", "hand_material_transfer", "cup_wrap_compare", "heat_claims", "insulation_curves", "contact_setup", "transfer_story"],
        10: ["melting", "shape_compare", "melting_timelapse", "evidence_frames", "conservation", "ice_energy", "phase_graph", "phase_graph", "particle_transition", "freezing", "phase_graph", "material_shelf", "app_sort", "state_claim_repairs", "evidence_match"],
        11: ["two_vanishing", "solution_terms", "solution_setup", "process_compare", "dissolving", "stirring_fair_test", "grain_size_fair_test", "temperature_fair_test", "rate_amount", "saturation", "more_solvent", "recovery", "solution_conservation", "mixture_columns", "evidence_match"],
    }
    if chapter in authored and index < len(authored[chapter]):
        return authored[chapter][index]
    key = f"{scene_id} {title}".lower()
    rules = [
        ("checkpoint", "checkpoint"), ("challenge", "checkpoint"), ("prediction", "checkpoint"),
        ("model contract", "model_contract"), ("model limit", "model_limits"), ("bad model", "model_limits"),
        ("solid", "solid_particles"), ("liquid", "liquid_particles"), ("gas", "gas_particles"),
        ("compress", "compression"), ("space", "compression"), ("evidence", "evidence_match"),
        ("temperature", "thermometer"), ("thermometer", "thermometer"), ("conduction", "conduction"),
        ("material", "material_compare"), ("cool", "cooling_graph"), ("balance", "cooling_graph"),
        ("path", "heat_paths"), ("energy", "heat_path"), ("heat", "heat_path"),
        ("melt", "melting"), ("water", "melting"), ("particle model", "particle_transition"),
        ("freez", "freezing"), ("shape", "shape_compare"), ("safe ice", "safe_setup"),
        ("dissolv", "dissolving"), ("solution", "solution_terms"), ("solute", "solution_terms"),
        ("speed", "rate_compare"), ("rate", "rate_compare"), ("satur", "saturation"),
        ("recover", "recovery"), ("evapor", "recovery"), ("filter", "filter_compare"),
        ("sort", "sort_board"), ("transfer", "sort_board"), ("summary", "evidence_match")
    ]
    for token, kind in rules:
        if token in key:
            return kind
    defaults = {
        8: ["evidence_match", "model_contract", "solid_particles", "liquid_particles", "checkpoint", "gas_particles", "particle_transition", "compression", "model_limits", "checkpoint", "sort_board", "checkpoint"],
        9: ["material_compare", "thermometer", "heat_path", "checkpoint", "conduction", "material_compare", "solid_particles", "cooling_graph", "checkpoint", "heat_paths", "safe_setup", "checkpoint"],
        10: ["melting", "checkpoint", "melting", "shape_compare", "heat_path", "particle_transition", "checkpoint", "freezing", "shape_compare", "sort_board", "safe_setup", "checkpoint"],
        11: ["dissolving", "checkpoint", "filter_compare", "dissolving", "solution_terms", "particle_transition", "checkpoint", "evidence_match", "recovery", "checkpoint", "saturation", "sort_board"]
    }
    values = defaults[chapter]
    return values[min(index, len(values) - 1)]


class ChemistryRevampScene(Scene):
    chapter_number = 8

    def construct(self):
        config.background_color = BG
        self.camera.background_color = BG
        timeline = timeline_for(self.chapter_number)
        scenes = [dict(scene, _chapter_index=index) for index, scene in enumerate(timeline["scenes"])]
        selected = os.environ.get("BQ_SCENE_INDICES", "").strip()
        if selected:
            indexes = {int(value) for value in selected.split(",") if value.strip()}
            scenes = [scene for scene in scenes if scene["_chapter_index"] in indexes]
        limit = int(os.environ.get("BQ_SCENE_LIMIT", "0") or 0)
        if limit > 0:
            scenes = scenes[:limit]
        duration_cap = float(os.environ.get("BQ_SCENE_DURATION_CAP", "0") or 0)
        current_shell = None
        current_progress = None
        for index, timing in enumerate(scenes):
            shell = board_shell(self.chapter_number, timing["title"])
            progress = progress_rail(self.chapter_number, index, len(scenes))
            if current_shell is None:
                self.play(FadeIn(shell), FadeIn(progress), run_time=0.8)
            else:
                self.play(Transform(current_shell, shell), Transform(current_progress, progress), run_time=0.55)
            current_shell = shell if current_shell is None else current_shell
            current_progress = progress if current_progress is None else current_progress
            duration = max(8.0, float(timing["end"]) - float(timing["start"]) - 1.2)
            if duration_cap > 0:
                duration = min(duration, duration_cap)
            kind = classify_kind(self.chapter_number, timing["id"], timing["title"], timing["_chapter_index"])
            self.run_visual(kind, timing, duration)

    def run_visual(self, kind, timing, duration):
        start = self.renderer.time
        handler = getattr(self, f"visual_{kind}", self.visual_evidence_match)
        focus = handler(timing)
        checkpoint = timing.get("checkpoint")
        checkpoint_prompt = checkpoint.get("prompt", "") if isinstance(checkpoint, dict) else checkpoint
        visual_duration = max(5.0, duration - (5.2 if checkpoint else 0))
        self.fill_scene(start, visual_duration, focus)
        if checkpoint:
            prompt_box = RoundedRectangle(width=11.4, height=1.15, corner_radius=0.18, color=GOLD, stroke_width=4).set_fill("#10272c", 0.98)
            prompt_text = fit_text(checkpoint_prompt, size=27, max_width=10.7, color=CREAM).move_to(prompt_box)
            prompt = VGroup(prompt_box, prompt_text).shift(DOWN * 2.45)
            self.play(FadeIn(prompt, shift=UP * 0.15), run_time=0.55)
            self.wait(4.1)
            self.play(FadeOut(prompt), run_time=0.35)
        self.play(FadeOut(focus), run_time=min(0.45, max(0.15, duration * 0.03)))

    def fill_scene(self, start, duration, focus):
        targets = list(focus) if isinstance(focus, VGroup) else [focus]
        cycle = 0
        while duration - (self.renderer.time - start) > 2.2:
            target = targets[cycle % len(targets)]
            run_time = min(2.6, duration - (self.renderer.time - start) - 0.35)
            if run_time <= 0.2:
                break
            self.play(
                Circumscribe(
                    target,
                    color=[TEAL, GOLD, GREEN][cycle % 3],
                    buff=0.08,
                    fade_out=True,
                    time_width=min(0.7, run_time * 0.35),
                ),
                run_time=run_time,
            )
            cycle += 1
        remaining = duration - (self.renderer.time - start)
        if remaining > 0:
            self.wait(remaining)

    def visual_checkpoint(self, timing):
        prompt = timing.get("checkpoint") or timing["title"]
        card = question_card(prompt, ["Observe", "Predict", "Explain", "Check evidence"]).shift(DOWN * 0.2)
        self.play(Create(card[0]), Write(card[1]), run_time=1.4)
        self.play(LaggedStart(*[FadeIn(box, shift=UP * 0.12) for box in card[2]], lag_ratio=0.18), run_time=1.2)
        thinking = Text("Your turn", font_size=28, color=GOLD, weight=BOLD).next_to(card, DOWN, buff=0.22)
        self.play(FadeIn(thinking), run_time=0.45)
        return VGroup(card, thinking)

    def visual_model_contract(self, timing):
        left = system_boundary(5.0, 3.5, TEAL).shift(LEFT * 2.8 + DOWN * 0.25)
        right = system_boundary(5.0, 3.5, ROSE).shift(RIGHT * 2.8 + DOWN * 0.25)
        yes = VGroup(chalk_label("MODEL SHOWS", TEAL, 28), chalk_label("spacing", CREAM), chalk_label("arrangement", CREAM), chalk_label("motion", CREAM)).arrange(DOWN, buff=0.34).move_to(left)
        no = VGroup(chalk_label("MODEL LEAVES OUT", ROSE, 28), chalk_label("exact size", CREAM), chalk_label("exact colour", CREAM), chalk_label("smell and texture", CREAM)).arrange(DOWN, buff=0.34).move_to(right)
        group = VGroup(left, right, yes, no)
        self.play(Create(left), Create(right), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(item) for item in yes], lag_ratio=0.18), run_time=1.1)
        self.play(LaggedStart(*[FadeIn(item) for item in no], lag_ratio=0.18), run_time=1.1)
        stamp = chalk_label("THINKING TOOL - NOT A PHOTO", GOLD, 30).next_to(group, DOWN, buff=0.25)
        self.play(Write(stamp), run_time=0.8)
        group.add(stamp)
        return group

    def particle_scene(self, kind, color=TEAL):
        boundary = system_boundary(7.0, 4.2, color).shift(DOWN * 0.25)
        if kind == "solid":
            dots = particle_grid(4, 7, 0.48, color).move_to(boundary)
            label = VGroup(chalk_label("close together", color, 24), chalk_label("mostly fixed places", CREAM, 24)).arrange(DOWN, buff=0.18).next_to(boundary, RIGHT, buff=0.35)
        elif kind == "liquid":
            dots = particle_cloud(25, 4.6, 2.5, color, seed=22).move_to(boundary)
            label = VGroup(chalk_label("close together", color, 24), chalk_label("slide past neighbours", CREAM, 24)).arrange(DOWN, buff=0.18).next_to(boundary, RIGHT, buff=0.35)
        else:
            dots = particle_cloud(17, 5.8, 3.2, color, seed=41).move_to(boundary)
            label = VGroup(chalk_label("spread through space", color, 24), chalk_label("collide with walls", CREAM, 24)).arrange(DOWN, buff=0.18).next_to(boundary, RIGHT, buff=0.35)
        group = VGroup(boundary, dots, label).shift(LEFT * 1.35)
        self.play(Create(boundary), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(dot, scale=0.4) for dot in dots], lag_ratio=0.025), run_time=1.2)
        self.play(FadeIn(label), run_time=0.7)
        for cycle in range(3):
            animations = []
            for index, dot in enumerate(dots):
                if kind == "solid":
                    offset = RIGHT * (0.055 if index % 2 else -0.055) + UP * (0.035 if index % 3 else -0.035)
                elif kind == "liquid":
                    offset = RIGHT * (0.22 if index % 2 else -0.22) + UP * (0.12 if index % 3 else -0.12)
                else:
                    offset = RIGHT * (0.34 if index % 2 else -0.34) + UP * (0.22 if index % 3 else -0.22)
                animations.append(dot.animate.shift(offset))
            self.play(AnimationGroup(*animations, lag_ratio=0.01), rate_func=there_and_back, run_time=1.8)
        return group

    def visual_solid_particles(self, timing):
        return self.particle_scene("solid", TEAL)

    def visual_liquid_particles(self, timing):
        return self.particle_scene("liquid", BLUE)

    def visual_gas_particles(self, timing):
        return self.particle_scene("gas", GOLD)

    def visual_compression(self, timing):
        outer = system_boundary(8.2, 3.8, GOLD).shift(DOWN * 0.25)
        dots = particle_cloud(18, 6.0, 2.5, GOLD, seed=12).move_to(outer)
        piston = Rectangle(width=0.35, height=3.6, color=CREAM, stroke_width=5).set_fill("#2d454a", 1).move_to(outer.get_right() + LEFT * 0.25)
        label = chalk_label("same particles - less space", GOLD, 30).next_to(outer, DOWN, buff=0.2)
        group = VGroup(outer, dots, piston, label)
        self.play(Create(outer), FadeIn(dots), FadeIn(piston), run_time=1.2)
        self.play(piston.animate.shift(LEFT * 2.2), *[dot.animate.shift(LEFT * (0.2 + (dot.get_center()[0] + 4) * 0.18)) for dot in dots], run_time=3.4, rate_func=smooth)
        self.play(Write(label), run_time=0.7)
        push = Arrow(piston.get_left() + RIGHT * 0.2, piston.get_left() + LEFT * 1.2, color=ROSE, stroke_width=7)
        self.play(GrowArrow(push), run_time=0.65)
        group.add(push)
        return group

    def visual_model_limits(self, timing):
        cards = VGroup()
        for title, symbol in [("tiny ice cubes", "ICE"), ("wet dots", "WET"), ("balloon particles", "BALLOON")]:
            box = RoundedRectangle(width=3.25, height=2.35, corner_radius=0.2, color=TEAL, stroke_width=3).set_fill("#10262b", 0.9)
            icon = Circle(radius=0.46, color=CREAM, stroke_width=4).move_to(box.get_center() + UP * 0.35)
            word = chalk_label(symbol, CREAM, 24).move_to(icon)
            caption = chalk_label(title, MUTED, 22).move_to(box.get_center() + DOWN * 0.72)
            cross = Cross(icon, stroke_color=RED, stroke_width=8)
            cards.add(VGroup(box, icon, word, caption, cross))
        cards.arrange(RIGHT, buff=0.45).shift(DOWN * 0.2)
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.18), run_time=1.2)
        self.play(LaggedStart(*[FadeIn(VGroup(*card[1:4])) for card in cards], lag_ratio=0.18), run_time=1.0)
        self.play(LaggedStart(*[Create(card[4]) for card in cards], lag_ratio=0.2), run_time=0.9)
        rule = chalk_label("use spacing and motion - not appearance", GOLD, 29).next_to(cards, DOWN, buff=0.3)
        self.play(Write(rule), run_time=0.8)
        return VGroup(cards, rule)

    def visual_evidence_bench(self, timing):
        bench = Line(LEFT * 5.2, RIGHT * 5.2, color="#76563c", stroke_width=14).shift(DOWN * 1.15)
        block = cube(GOLD).scale(0.72).shift(LEFT * 3.5 + DOWN * 0.15)
        cup = beaker(1.8, 2.25, BLUE).shift(DOWN * 0.15)
        balloon = Ellipse(width=1.65, height=2.0, color=ROSE, stroke_width=5).set_fill(ROSE, 0.16).shift(RIGHT * 3.45)
        items = VGroup(block, cup, balloon)
        labels = VGroup(chalk_label("WOOD BLOCK", GOLD, 21), chalk_label("WATER", BLUE, 21), chalk_label("AIR", ROSE, 21))
        for label, item in zip(labels, items): label.next_to(item, DOWN, buff=0.2)
        self.play(Create(bench), LaggedStart(*[FadeIn(item, shift=UP * 0.15) for item in items], lag_ratio=0.2), run_time=1.2)
        self.play(LaggedStart(*[Write(label) for label in labels], lag_ratio=0.2), run_time=0.8)
        note = chalk_label("three materials - three sets of evidence", GREEN, 27).next_to(bench, DOWN, buff=0.48)
        self.play(Write(note), run_time=0.7)
        return VGroup(bench, items, labels, note)

    def visual_liquid_evidence_model(self, timing):
        cup = beaker(3.0, 3.4, BLUE).shift(LEFT * 2.8 + DOWN * 0.15)
        model = system_boundary(4.5, 3.4, TEAL).shift(RIGHT * 2.65 + DOWN * 0.15)
        dots = particle_cloud(25, 3.45, 2.1, TEAL, seed=208).move_to(model.get_center() + DOWN * 0.25)
        labels = VGroup(chalk_label("EVIDENCE: FLOWS", BLUE, 22).next_to(cup, DOWN, buff=0.22), chalk_label("MODEL: SLIDES", TEAL, 22).next_to(model, DOWN, buff=0.22))
        self.play(FadeIn(cup), Write(labels[0]), run_time=0.9)
        self.play(cup.animate.rotate(-0.16), run_time=1.0, rate_func=there_and_back)
        self.play(Create(model), LaggedStart(*[FadeIn(dot, scale=0.5) for dot in dots], lag_ratio=0.02), Write(labels[1]), run_time=1.2)
        self.play(AnimationGroup(*[dot.animate.shift(RIGHT * (0.15 if i % 2 else -0.15) + UP * (0.08 if i % 3 else -0.08)) for i, dot in enumerate(dots)], lag_ratio=0.01), rate_func=there_and_back, run_time=1.5)
        return VGroup(cup, model, dots, labels)

    def visual_compression_compare(self, timing):
        syringes = VGroup()
        for x, label, color, spacing in [(-2.8, "AIR", GOLD, 0.5), (2.8, "WATER", BLUE, 0.28)]:
            body = RoundedRectangle(width=4.15, height=1.65, corner_radius=0.18, color=CREAM, stroke_width=4).shift(RIGHT * x + DOWN * 0.15)
            plunger = Rectangle(width=0.28, height=1.45, color=color, stroke_width=4).move_to(body.get_left() + RIGHT * 0.3)
            dots = particle_grid(2, 6, spacing, color, 0.075).move_to(body.get_center() + RIGHT * 0.25)
            syringes.add(VGroup(body, plunger, dots, chalk_label(label, color, 24).next_to(body, DOWN, buff=0.22)))
        self.play(LaggedStart(*[FadeIn(item) for item in syringes], lag_ratio=0.2), run_time=1.1)
        self.play(syringes[0][1].animate.shift(RIGHT * 1.25), syringes[0][2].animate.stretch(0.58, 0).shift(RIGHT * 0.7), syringes[1][1].animate.shift(RIGHT * 0.18), run_time=2.3)
        result = VGroup(chalk_label("compresses", GREEN, 22).next_to(syringes[0], UP, buff=0.18), chalk_label("barely changes", ROSE, 22).next_to(syringes[1], UP, buff=0.18))
        self.play(FadeIn(result), run_time=0.65)
        return VGroup(syringes, result)

    def visual_scent_diffusion(self, timing):
        room = system_boundary(7.6, 3.9, TEAL).shift(LEFT * 1.0 + DOWN * 0.2)
        source = VGroup(Circle(radius=0.34, color=ROSE).set_fill(ROSE, 0.25), chalk_label("SCENT", ROSE, 16)).move_to(room.get_left() + RIGHT * 0.8 + DOWN * 0.85)
        person = VGroup(Circle(radius=0.28, color=CREAM), Line(UP * 0.5, DOWN * 0.65, color=CREAM, stroke_width=5)).shift(room.get_right() + LEFT * 0.8)
        scent = particle_cloud(14, 0.85, 0.8, ROSE, seed=221).move_to(source)
        targets = particle_cloud(14, 5.6, 2.4, ROSE, seed=222).move_to(room)
        inset = system_boundary(2.8, 1.65, GOLD).shift(RIGHT * 4.7 + UP * 0.35)
        inset_dots = particle_cloud(10, 2.0, 0.9, ROSE, seed=223).move_to(inset)
        self.play(Create(room), FadeIn(source), FadeIn(person), FadeIn(scent), run_time=1.0)
        self.play(*[Transform(dot, target) for dot, target in zip(scent, targets)], run_time=2.6)
        self.play(Create(inset), FadeIn(inset_dots), run_time=0.8)
        note = chalk_label("scent spreads through air", GOLD, 24).next_to(room, DOWN, buff=0.24)
        self.play(Write(note), run_time=0.7)
        return VGroup(room, source, person, scent, inset, inset_dots, note)

    def visual_food_colouring(self, timing):
        cup = beaker(3.7, 4.25, BLUE).shift(DOWN * 0.15)
        dropper = Line(UP * 0.55, DOWN * 0.45, color=CREAM, stroke_width=7).next_to(cup, UP, buff=-0.12)
        drop = Dot(radius=0.16, color=ROSE).next_to(dropper, DOWN, buff=0.05)
        plume = particle_cloud(18, 0.7, 0.9, ROSE, seed=231).move_to(cup.get_top() + DOWN * 1.0)
        spread = particle_cloud(18, 2.4, 2.15, ROSE, seed=232).move_to(cup.get_center() + DOWN * 0.35)
        self.play(FadeIn(cup), Create(dropper), FadeIn(drop), run_time=0.9)
        self.play(drop.animate.move_to(cup.get_top() + DOWN * 0.65), run_time=0.7)
        self.play(ReplacementTransform(drop, plume), run_time=0.8)
        self.play(*[Transform(dot, target) for dot, target in zip(plume, spread)], run_time=2.3)
        note = chalk_label("colour spreads through still water", GREEN, 27).next_to(cup, RIGHT, buff=0.5)
        self.play(Write(note), run_time=0.7)
        return VGroup(cup, dropper, plume, note)

    def visual_concentration_spread(self, timing):
        boxes = VGroup(system_boundary(4.65, 3.35, ROSE), system_boundary(4.65, 3.35, TEAL)).arrange(RIGHT, buff=0.75).shift(DOWN * 0.25)
        crowded = particle_cloud(18, 1.1, 2.0, ROSE, seed=241).move_to(boxes[0].get_left() + RIGHT * 1.0)
        spread = particle_cloud(18, 3.6, 2.0, ROSE, seed=242).move_to(boxes[1])
        bars1 = VGroup(*[Rectangle(width=0.25, height=h, stroke_width=0).set_fill(ROSE, 0.9) for h in (1.5, 1.15, 0.7, 0.3)]).arrange(RIGHT, buff=0.12).move_to(boxes[0].get_bottom() + UP * 0.85 + RIGHT * 1.35)
        bars2 = VGroup(*[Rectangle(width=0.25, height=0.65, stroke_width=0).set_fill(TEAL, 0.9) for _ in range(4)]).arrange(RIGHT, buff=0.12).move_to(boxes[1].get_bottom() + UP * 0.72 + RIGHT * 1.25)
        labels = VGroup(chalk_label("CROWDED", ROSE, 22).next_to(boxes[0], DOWN, buff=0.2), chalk_label("MORE EVEN", TEAL, 22).next_to(boxes[1], DOWN, buff=0.2))
        self.play(Create(boxes[0]), FadeIn(crowded), FadeIn(bars1), Write(labels[0]), run_time=1.0)
        self.play(Create(boxes[1]), TransformFromCopy(crowded, spread), TransformFromCopy(bars1, bars2), Write(labels[1]), run_time=1.8)
        return VGroup(boxes, crowded, spread, bars1, bars2, labels)

    def visual_cup_prediction(self, timing):
        cups = VGroup(beaker(3.5, 2.25, BLUE).shift(DOWN * 0.55), beaker(2.2, 3.7, BLUE)).arrange(RIGHT, buff=1.6).shift(DOWN * 0.1)
        labels = VGroup(chalk_label("SHALLOW", TEAL, 22).next_to(cups[0], DOWN, buff=0.2), chalk_label("TALL", TEAL, 22).next_to(cups[1], DOWN, buff=0.2))
        drops = VGroup(*[Dot(radius=0.16, color=ROSE).next_to(cup, UP, buff=0.12) for cup in cups])
        controls = VGroup(*[chalk_label(value, GREEN, 20) for value in ("same water", "same drop", "same start")]).arrange(RIGHT, buff=0.55).shift(DOWN * 2.05)
        question = chalk_label("which becomes even first?", GOLD, 28).shift(UP * 1.75)
        self.play(FadeIn(cups), FadeIn(labels), FadeIn(drops), run_time=1.0)
        self.play(Write(question), LaggedStart(*[FadeIn(item) for item in controls], lag_ratio=0.18), run_time=0.9)
        return VGroup(cups, labels, drops, controls, question)

    def visual_particle_claim_repairs(self, timing):
        return self.repair_cards([("gas is nothing", "gas is matter"), ("particles are crushed", "gaps get smaller"), ("dots show appearance", "dots are a model")])

    def visual_bag_compression_compare(self, timing):
        bags = VGroup()
        for label, color, count in [("AIR BAG", GOLD, 15), ("WATER BAG", BLUE, 25)]:
            bag = RoundedRectangle(width=4.0, height=3.0, corner_radius=0.55, color=CREAM, stroke_width=5).set_fill(color, 0.1)
            dots = particle_cloud(count, 3.1, 2.1, color, seed=260 + count).move_to(bag)
            bags.add(VGroup(bag, dots, chalk_label(label, color, 23).next_to(bag, DOWN, buff=0.22)))
        bags.arrange(RIGHT, buff=1.0).shift(DOWN * 0.15)
        pushes = VGroup(*[Arrow(item[0].get_top() + UP * 0.6, item[0].get_top(), color=ROSE, stroke_width=6) for item in bags])
        self.play(FadeIn(bags), LaggedStart(*[GrowArrow(a) for a in pushes], lag_ratio=0.2), run_time=1.1)
        self.play(bags[0][0].animate.stretch(0.7, 1), bags[0][1].animate.stretch(0.7, 1), bags[1][0].animate.stretch(0.94, 1), run_time=2.0)
        note = chalk_label("air changes volume much more", GREEN, 27).next_to(bags, DOWN, buff=0.28)
        self.play(Write(note), run_time=0.7)
        return VGroup(bags, pushes, note)

    def visual_diffusion_fair_test(self, timing):
        cups = VGroup(beaker(2.3, 3.0, BLUE), beaker(2.3, 3.0, ORANGE)).arrange(RIGHT, buff=1.7).shift(DOWN * 0.15)
        labels = VGroup(chalk_label("COOL", BLUE, 23), chalk_label("LUKEWARM", ORANGE, 23))
        for label, cup in zip(labels, cups): label.next_to(cup, DOWN, buff=0.2)
        droppers = VGroup(*[VGroup(Line(UP * 0.4, DOWN * 0.35, color=CREAM, stroke_width=6), Dot(radius=0.12, color=ROSE)).next_to(cup, UP, buff=-0.1) for cup in cups])
        timer = VGroup(Circle(radius=0.42, color=GOLD, stroke_width=4), Line(ORIGIN, UP * 0.24, color=GOLD, stroke_width=4)).shift(RIGHT * 5 + UP * 0.5)
        hot = VGroup(chalk_label("HOT", RED, 23), Cross(Square(0.72), stroke_color=RED, stroke_width=7)).arrange(DOWN, buff=0.12).shift(LEFT * 5 + UP * 0.5)
        controls = VGroup(*[chalk_label(value, GREEN, 17) for value in ("same cups", "same water", "same drop", "same timer")]).arrange(RIGHT, buff=0.42).shift(DOWN * 2.62)
        self.play(FadeIn(cups), FadeIn(labels), FadeIn(droppers), FadeIn(timer), run_time=1.0)
        self.play(FadeIn(hot[0]), Create(hot[1]), LaggedStart(*[FadeIn(item) for item in controls], lag_ratio=0.15), run_time=1.0)
        return VGroup(cups, labels, droppers, timer, hot, controls)

    def repair_cards(self, claims):
        cards = VGroup()
        for wrong, right in claims:
            box = RoundedRectangle(width=3.45, height=3.05, corner_radius=0.2, color=ROSE, stroke_width=4).set_fill("#10272c", 0.95)
            bad = chalk_label(wrong, ROSE, 19).move_to(box.get_center() + UP * 0.68)
            cross = Cross(bad, stroke_color=RED, stroke_width=6)
            good = chalk_label(right, GREEN, 20).move_to(box.get_center() + DOWN * 0.65)
            cards.add(VGroup(box, bad, cross, good))
        cards.arrange(RIGHT, buff=0.35).shift(DOWN * 0.2)
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.18), run_time=0.9)
        self.play(LaggedStart(*[FadeIn(card[1]) for card in cards], lag_ratio=0.18), run_time=0.7)
        self.play(LaggedStart(*[Create(card[2]) for card in cards], lag_ratio=0.18), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(card[3], shift=UP * 0.12) for card in cards], lag_ratio=0.18), run_time=0.85)
        return cards

    def visual_diffusion(self, timing):
        boundary = system_boundary(8.6, 4.1, TEAL).shift(DOWN * 0.25)
        carrier = particle_cloud(24, 6.8, 2.8, BLUE, seed=112).move_to(boundary)
        cluster = particle_cloud(12, 1.1, 1.1, ROSE, seed=117).move_to(boundary.get_left() + RIGHT * 1.2)
        targets = particle_cloud(12, 6.2, 2.4, ROSE, seed=121).move_to(boundary)
        before = chalk_label("crowded", ROSE, 24).next_to(cluster, UP, buff=0.18)
        rule = chalk_label("irregular motion spreads particles through the space", GREEN, 27).next_to(boundary, DOWN, buff=0.25)
        self.play(Create(boundary), FadeIn(carrier), FadeIn(cluster), FadeIn(before), run_time=1.1)
        self.play(*[Transform(dot, target) for dot, target in zip(cluster, targets)], FadeOut(before), run_time=3.4, rate_func=smooth)
        self.play(Write(rule), run_time=0.8)
        return VGroup(boundary, carrier, cluster, rule)

    def visual_heat_particles(self, timing):
        cool_box = system_boundary(4.7, 3.5, BLUE).shift(LEFT * 2.7 + DOWN * 0.2)
        warm_box = system_boundary(4.7, 3.5, ORANGE).shift(RIGHT * 2.7 + DOWN * 0.2)
        cool = particle_grid(4, 6, 0.42, BLUE).move_to(cool_box)
        warm = particle_grid(4, 6, 0.42, BLUE).move_to(warm_box)
        labels = VGroup(chalk_label("COOLER", BLUE, 25).next_to(cool_box, DOWN, buff=0.2), chalk_label("WARMER", ORANGE, 25).next_to(warm_box, DOWN, buff=0.2))
        same = chalk_label("same solid - larger vibration when warmer", GOLD, 27).next_to(VGroup(cool_box, warm_box), DOWN, buff=0.65)
        self.play(Create(cool_box), Create(warm_box), FadeIn(cool), FadeIn(warm), FadeIn(labels), run_time=1.1)
        for _ in range(3):
            cool_moves = [dot.animate.shift(RIGHT * (0.035 if i % 2 else -0.035)) for i, dot in enumerate(cool)]
            warm_moves = [dot.animate.shift(RIGHT * (0.15 if i % 2 else -0.15) + UP * (0.08 if i % 3 else -0.08)) for i, dot in enumerate(warm)]
            self.play(AnimationGroup(*cool_moves, *warm_moves, lag_ratio=0.005), rate_func=there_and_back, run_time=1.4)
        self.play(Write(same), run_time=0.75)
        return VGroup(cool_box, warm_box, cool, warm, labels, same)

    def visual_heat_claims(self, timing):
        cards = VGroup()
        claims = [("cold moves in", "energy moves out"), ("heat is a number", "temperature is read"), ("hot particles", "same particles")]
        for wrong, repair in claims:
            box = RoundedRectangle(width=3.4, height=2.9, corner_radius=0.2, color=ROSE, stroke_width=4).set_fill("#10272c", 0.95)
            bad = chalk_label(wrong, ROSE, 22).move_to(box.get_center() + UP * 0.55)
            cross = Cross(bad, stroke_color=RED, stroke_width=7)
            good = chalk_label(repair, GREEN, 21).move_to(box.get_center() + DOWN * 0.72)
            cards.add(VGroup(box, bad, cross, good))
        cards.arrange(RIGHT, buff=0.4).shift(DOWN * 0.2)
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.18), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(card[1]) for card in cards], lag_ratio=0.18), run_time=0.8)
        self.play(LaggedStart(*[Create(card[2]) for card in cards], lag_ratio=0.18), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(card[3], shift=UP * 0.12) for card in cards], lag_ratio=0.18), run_time=0.9)
        return cards

    def visual_contact_setup(self, timing):
        cups = VGroup(beaker(2.0, 2.6, ORANGE), beaker(2.0, 2.6, ORANGE)).arrange(RIGHT, buff=1.2).shift(DOWN * 0.2)
        thermometers = VGroup(thermometer(28, ORANGE).scale(0.62), thermometer(28, ORANGE).scale(0.62))
        for item, cup in zip(thermometers, cups):
            item.next_to(cup, UP, buff=-0.55)
        labels = VGroup(chalk_label("METAL", BLUE, 24), chalk_label("WOOD", GOLD, 24))
        for label, cup in zip(labels, cups):
            label.next_to(cup, DOWN, buff=0.22)
        controls = VGroup(chalk_label("equal cups", GREEN, 21), chalk_label("equal water", GREEN, 21), chalk_label("same start", GREEN, 21), chalk_label("regular readings", GREEN, 21)).arrange(RIGHT, buff=0.45).next_to(cups, DOWN, buff=0.65)
        self.play(FadeIn(cups), FadeIn(thermometers), FadeIn(labels), run_time=1.1)
        self.play(LaggedStart(*[FadeIn(item, shift=UP * 0.1) for item in controls], lag_ratio=0.18), run_time=0.9)
        safe = chalk_label("warm tap water - adult checks first", TEAL, 25).next_to(controls, DOWN, buff=0.2)
        self.play(Write(safe), run_time=0.7)
        return VGroup(cups, thermometers, labels, controls, safe)

    def visual_ice_energy(self, timing):
        bag = RoundedRectangle(width=4.0, height=3.4, corner_radius=0.28, color=CREAM, stroke_width=5).set_fill("#d9f0f3", 0.08).shift(DOWN * 0.25)
        ice = cube(BLUE).scale(0.8).move_to(bag)
        room = RoundedRectangle(width=10.2, height=4.6, corner_radius=0.28, color=ORANGE, stroke_width=3).set_opacity(0.55).shift(DOWN * 0.25)
        arrows = VGroup(*[Arrow(room.get_left() + RIGHT * 1.2 + UP * y, bag.get_left() + UP * y, color=ORANGE, stroke_width=5, buff=0.2) for y in (-0.8, 0, 0.8)], *[Arrow(room.get_right() + LEFT * 1.2 + UP * y, bag.get_right() + UP * y, color=ORANGE, stroke_width=5, buff=0.2) for y in (-0.8, 0, 0.8)])
        label = chalk_label("energy transfers from warmer room to colder ice", GOLD, 27).next_to(room, DOWN, buff=0.2)
        self.play(Create(room), Create(bag), FadeIn(ice), run_time=1.1)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.1), run_time=1.2)
        self.play(Write(label), run_time=0.75)
        return VGroup(room, bag, ice, arrows, label)

    def visual_phase_graph(self, timing):
        cooling = "cool" in timing["title"].lower() or "freez" in timing["title"].lower()
        axes = Axes(x_range=[0, 10, 1], y_range=[0, 10, 1], x_length=8.6, y_length=4.1, tips=False, axis_config={"color": CREAM, "stroke_width": 4}).shift(LEFT * 0.45 + DOWN * 0.25)
        points = [(0.6, 2.0), (3.2, 5.1), (6.6, 5.1), (9.4, 8.0)]
        if cooling:
            points = [(0.6, 8.0), (3.2, 5.1), (6.6, 5.1), (9.4, 2.0)]
        graph = VMobject(color=BLUE if cooling else ORANGE, stroke_width=7)
        graph.set_points_as_corners([axes.c2p(x, y) for x, y in points])
        labels = VGroup(
            chalk_label("solid", BLUE, 21).move_to(axes.c2p(1.7, points[0][1] + (0.6 if not cooling else -0.6))),
            chalk_label("state change", GOLD, 21).move_to(axes.c2p(4.9, 5.8)),
            chalk_label("liquid", TEAL, 21).move_to(axes.c2p(8.0, points[-1][1] + (-0.6 if not cooling else 0.6))),
        )
        if cooling:
            labels[0], labels[2] = labels[2], labels[0]
        plateau = SurroundingRectangle(labels[1], color=GOLD, buff=0.12, stroke_width=3)
        xlab = chalk_label("time", MUTED, 22).next_to(axes.x_axis, DOWN, buff=0.12)
        ylab = chalk_label("temperature", MUTED, 22).rotate(PI / 2).next_to(axes.y_axis, LEFT, buff=0.12)
        self.play(Create(axes), FadeIn(xlab), FadeIn(ylab), run_time=1.0)
        self.play(Create(graph), run_time=2.5)
        self.play(FadeIn(labels), Create(plateau), run_time=0.9)
        return VGroup(axes, graph, labels, plateau, xlab, ylab)

    def visual_conservation(self, timing):
        left = VGroup(cube(BLUE).scale(0.72), chalk_label("solid water", BLUE, 23)).arrange(DOWN, buff=0.22).shift(LEFT * 2.8 + DOWN * 0.15)
        right = VGroup(Ellipse(width=2.3, height=0.62, color=TEAL, stroke_width=5).set_fill(TEAL, 0.32), chalk_label("liquid water", TEAL, 23)).arrange(DOWN, buff=0.22).shift(RIGHT * 2.8 + DOWN * 0.15)
        left_read = chalk_label("100.0 g", GOLD, 29).next_to(left, UP, buff=0.28)
        right_read = chalk_label("100.0 g", GOLD, 29).next_to(right, UP, buff=0.28)
        equals = Text("=", font_size=64, color=CREAM, weight=BOLD)
        label = chalk_label("same material remains in the closed system", GREEN, 27).next_to(VGroup(left, right), DOWN, buff=0.4)
        self.play(FadeIn(left), FadeIn(left_read), run_time=0.8)
        self.play(FadeIn(equals), FadeIn(right), FadeIn(right_read), run_time=1.0)
        self.play(Write(label), run_time=0.75)
        return VGroup(left, right, left_read, right_read, equals, label)

    def visual_two_vanishing(self, timing):
        melt = VGroup(cube(BLUE).scale(0.65), Arrow(LEFT * 0.25, RIGHT * 0.55, color=GOLD, stroke_width=5), Ellipse(width=1.5, height=0.45, color=TEAL, stroke_width=4).set_fill(TEAL, 0.3)).arrange(RIGHT, buff=0.3).shift(LEFT * 2.8)
        dissolve = VGroup(VGroup(*[Square(side_length=0.18, color=ROSE, stroke_width=2).set_fill(ROSE, 0.8) for _ in range(9)]).arrange_in_grid(3, 3, buff=0.06), Arrow(LEFT * 0.25, RIGHT * 0.55, color=GOLD, stroke_width=5), beaker(1.65, 2.2, BLUE)).arrange(RIGHT, buff=0.3).shift(RIGHT * 2.8)
        labels = VGroup(chalk_label("MELTING", BLUE, 25).next_to(melt, DOWN, buff=0.3), chalk_label("DISSOLVING", GREEN, 25).next_to(dissolve, DOWN, buff=0.3))
        divider = DashedLine(UP * 2.0, DOWN * 2.0, color=MUTED, dash_length=0.16)
        self.play(FadeIn(melt[0]), FadeIn(dissolve[0]), Create(divider), run_time=0.9)
        self.play(GrowArrow(melt[1]), FadeIn(melt[2]), GrowArrow(dissolve[1]), FadeIn(dissolve[2]), run_time=1.2)
        self.play(FadeIn(labels), run_time=0.7)
        question = chalk_label("similar appearance - different process", GOLD, 28).next_to(VGroup(melt, dissolve), DOWN, buff=0.55)
        self.play(Write(question), run_time=0.75)
        return VGroup(melt, dissolve, labels, divider, question)

    def visual_solution_setup(self, timing):
        cup = beaker(2.8, 3.5, BLUE).shift(DOWN * 0.2)
        salt = VGroup(*[Square(side_length=0.17, color=ROSE, stroke_width=2).set_fill(ROSE, 0.85) for _ in range(12)]).arrange_in_grid(3, 4, buff=0.07).shift(LEFT * 3.1 + UP * 0.5)
        spoon = Arc(radius=0.75, start_angle=0.3, angle=1.7 * PI, color=GOLD, stroke_width=6).move_to(cup)
        labels = VGroup(chalk_label("known food salt", ROSE, 23).next_to(salt, DOWN, buff=0.2), chalk_label("clear cup + measured water", BLUE, 23).next_to(cup, DOWN, buff=0.25))
        self.play(FadeIn(cup), FadeIn(salt), FadeIn(labels), run_time=1.0)
        self.play(salt.animate.move_to(cup.get_top() + DOWN * 0.7), run_time=1.2)
        self.play(Create(spoon), Rotate(spoon, angle=2 * PI), run_time=1.8)
        safe = chalk_label("adult nearby - no tasting - wipe spills", GREEN, 25).next_to(labels, DOWN, buff=0.25)
        self.play(Write(safe), run_time=0.7)
        return VGroup(cup, salt, spoon, labels, safe)

    def visual_rate_amount(self, timing):
        left = RoundedRectangle(width=4.8, height=3.6, corner_radius=0.22, color=GOLD, stroke_width=4).set_fill("#10272c", 0.95).shift(LEFT * 2.7 + DOWN * 0.2)
        right = RoundedRectangle(width=4.8, height=3.6, corner_radius=0.22, color=GREEN, stroke_width=4).set_fill("#10272c", 0.95).shift(RIGHT * 2.7 + DOWN * 0.2)
        rate = VGroup(chalk_label("RATE", GOLD, 29), chalk_label("how fast?", CREAM, 24), VGroup(Circle(radius=0.42, color=CREAM, stroke_width=4), Line(ORIGIN, UP * 0.25, color=GOLD, stroke_width=4))).arrange(DOWN, buff=0.28).move_to(left)
        amount = VGroup(chalk_label("AMOUNT", GREEN, 29), chalk_label("how much?", CREAM, 24), VGroup(*[Square(side_length=0.22, color=ROSE, stroke_width=2).set_fill(ROSE, 0.8) for _ in range(12)]).arrange_in_grid(3, 4, buff=0.06)).arrange(DOWN, buff=0.28).move_to(right)
        self.play(Create(left), Create(right), run_time=0.9)
        self.play(FadeIn(rate), FadeIn(amount), run_time=1.0)
        not_same = chalk_label("different questions", TEAL, 28).next_to(VGroup(left, right), DOWN, buff=0.3)
        self.play(Write(not_same), run_time=0.7)
        return VGroup(left, right, rate, amount, not_same)

    def visual_more_solvent(self, timing):
        small = beaker(2.3, 3.0, BLUE).shift(LEFT * 2.5 + DOWN * 0.2)
        large = beaker(3.0, 3.7, BLUE).shift(RIGHT * 2.5 + DOWN * 0.2)
        small_salt = particle_cloud(10, 1.4, 1.2, ROSE, seed=131).move_to(small.get_center() + DOWN * 0.35)
        large_salt = particle_cloud(20, 1.9, 1.7, ROSE, seed=137).move_to(large.get_center() + DOWN * 0.35)
        arrow = Arrow(small.get_right(), large.get_left(), color=GOLD, stroke_width=7, buff=0.3)
        labels = VGroup(chalk_label("less solvent", MUTED, 22).next_to(small, DOWN, buff=0.22), chalk_label("more solvent", GREEN, 22).next_to(large, DOWN, buff=0.22))
        self.play(FadeIn(small), FadeIn(small_salt), FadeIn(labels[0]), run_time=0.8)
        self.play(GrowArrow(arrow), FadeIn(large), FadeIn(large_salt), FadeIn(labels[1]), run_time=1.1)
        rule = chalk_label("more solvent can dissolve more solute", GOLD, 27).next_to(labels, DOWN, buff=0.25)
        self.play(Write(rule), run_time=0.7)
        return VGroup(small, large, small_salt, large_salt, arrow, labels, rule)

    def visual_evidence_match(self, timing):
        theme = THEMES[self.chapter_number]
        claims = ["OBSERVE", "EXPLAIN", "CHECK LIMITS"]
        cards = VGroup(*[
            RoundedRectangle(width=3.35, height=2.7, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10282d", 0.95)
            for color in (theme["accent"], theme["secondary"], GREEN)
        ]).arrange(RIGHT, buff=0.45).shift(DOWN * 0.2)
        icons = VGroup()
        icons.add(VGroup(Circle(radius=0.52, color=theme["accent"], stroke_width=5), Dot(radius=0.13, color=theme["accent"])))
        icons.add(VGroup(Arrow(LEFT * 0.65, RIGHT * 0.65, color=theme["secondary"], stroke_width=7), Dot(radius=0.16, color=CREAM)))
        icons.add(VGroup(Square(side_length=1.0, color=GREEN, stroke_width=5), Text("?", font_size=42, color=GREEN, weight=BOLD)))
        for card, icon, label in zip(cards, icons, claims):
            icon.move_to(card.get_center() + UP * 0.35)
            word = chalk_label(label, CREAM, 24).move_to(card.get_center() + DOWN * 0.82)
            card.add(icon, word)
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.2), run_time=1.15)
        self.play(LaggedStart(*[FadeIn(VGroup(*card[1:])) for card in cards], lag_ratio=0.2), run_time=1.0)
        connectors = VGroup(
            Arrow(cards[0].get_right(), cards[1].get_left(), color=GOLD, buff=0.12, stroke_width=5),
            Arrow(cards[1].get_right(), cards[2].get_left(), color=GOLD, buff=0.12, stroke_width=5),
        )
        self.play(LaggedStart(*[GrowArrow(arrow) for arrow in connectors], lag_ratio=0.25), run_time=0.9)
        rule = chalk_label("claim + evidence + model", theme["accent"], 31).next_to(cards, DOWN, buff=0.3)
        self.play(Write(rule), run_time=0.75)
        return VGroup(cards, connectors, rule)

    def visual_spoon_touch(self, timing):
        spoons = VGroup()
        for label, color in [("METAL", BLUE), ("WOOD", GOLD)]:
            handle = RoundedRectangle(width=4.1, height=0.45, corner_radius=0.2, color=color, stroke_width=4)
            bowl = Ellipse(width=1.2, height=0.75, color=color, stroke_width=4).next_to(handle, LEFT, buff=-0.15)
            spoons.add(VGroup(handle, bowl, chalk_label(label, color, 23).next_to(handle, DOWN, buff=0.25)))
        spoons.arrange(DOWN, buff=0.85).shift(DOWN * 0.1)
        readings = VGroup(*[chalk_label("22 C", GREEN, 24).next_to(spoon, RIGHT, buff=0.35) for spoon in spoons])
        hands = VGroup(*[Circle(radius=0.38, color=CREAM, stroke_width=4).next_to(spoon, RIGHT, buff=1.25) for spoon in spoons])
        arrows = VGroup(Arrow(spoons[0].get_right(), hands[0].get_left(), color=ORANGE, stroke_width=7), Arrow(spoons[1].get_right(), hands[1].get_left(), color=ORANGE, stroke_width=4))
        self.play(LaggedStart(*[FadeIn(spoon) for spoon in spoons], lag_ratio=0.2), FadeIn(readings), run_time=1.0)
        self.play(FadeIn(hands), GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=1.0)
        note = chalk_label("same temperature - different transfer rate", GREEN, 27).next_to(spoons, DOWN, buff=0.35)
        self.play(Write(note), run_time=0.7)
        return VGroup(spoons, readings, hands, arrows, note)

    def visual_cooling_paths(self, timing):
        cup = beaker(2.8, 3.3, ORANGE).shift(DOWN * 0.2)
        arrows = VGroup(*[Arrow(cup.get_center() + direction * 0.7, cup.get_center() + direction * 2.4, color=GOLD, stroke_width=6) for direction in (LEFT, RIGHT, UP)])
        labels = VGroup(chalk_label("table", BLUE, 20).next_to(arrows[0], LEFT, buff=0.1), chalk_label("air", TEAL, 20).next_to(arrows[1], RIGHT, buff=0.1), chalk_label("surface", GOLD, 20).next_to(arrows[2], UP, buff=0.1))
        self.play(FadeIn(cup), run_time=0.8)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.2), FadeIn(labels), run_time=1.2)
        note = chalk_label("energy spreads along several pathways", GREEN, 27).next_to(cup, DOWN, buff=0.35)
        self.play(Write(note), run_time=0.7)
        return VGroup(cup, arrows, labels, note)

    def visual_cooling_change_graph(self, timing):
        axes = Axes(x_range=[0, 10, 1], y_range=[0, 10, 1], x_length=8.7, y_length=4.1, tips=False, axis_config={"color": CREAM, "stroke_width": 4}).shift(DOWN * 0.25)
        graph = axes.plot(lambda x: 2.7 + 5.4 * math.exp(-x / 2.4), x_range=[0, 10], color=ORANGE, stroke_width=7)
        steep = SurroundingRectangle(graph.copy().pointwise_become_partial(graph, 0, 0.32), color=ROSE, buff=0.16)
        flat = SurroundingRectangle(graph.copy().pointwise_become_partial(graph, 0.66, 1), color=TEAL, buff=0.16)
        labels = VGroup(chalk_label("large change", ROSE, 22).next_to(steep, UP, buff=0.1), chalk_label("small change", TEAL, 22).next_to(flat, UP, buff=0.1))
        self.play(Create(axes), Create(graph), run_time=2.0)
        self.play(Create(steep), Write(labels[0]), run_time=0.7)
        self.play(Create(flat), Write(labels[1]), run_time=0.7)
        return VGroup(axes, graph, steep, flat, labels)

    def visual_hand_material_transfer(self, timing):
        hand = Circle(radius=0.58, color=CREAM, stroke_width=5).shift(LEFT * 4.8)
        samples = VGroup(RoundedRectangle(width=3.4, height=1.5, corner_radius=0.18, color=BLUE, stroke_width=4), RoundedRectangle(width=3.4, height=1.5, corner_radius=0.18, color=GOLD, stroke_width=4)).arrange(DOWN, buff=0.65).shift(RIGHT * 1.0)
        labels = VGroup(chalk_label("METAL", BLUE, 22).move_to(samples[0]), chalk_label("WOOD", GOLD, 22).move_to(samples[1]))
        arrows = VGroup(Arrow(hand.get_right(), samples[0].get_left(), color=ORANGE, stroke_width=8), Arrow(hand.get_right(), samples[1].get_left(), color=ORANGE, stroke_width=4))
        self.play(FadeIn(hand), FadeIn(samples), FadeIn(labels), run_time=1.0)
        self.play(GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=1.1)
        note = chalk_label("faster energy transfer feels colder", GREEN, 27).next_to(samples, DOWN, buff=0.3)
        self.play(Write(note), run_time=0.7)
        return VGroup(hand, samples, labels, arrows, note)

    def visual_cup_wrap_compare(self, timing):
        cups = VGroup(beaker(2.5, 3.1, ORANGE), beaker(2.5, 3.1, ORANGE)).arrange(RIGHT, buff=1.8).shift(DOWN * 0.2)
        wrap = RoundedRectangle(width=2.8, height=2.4, corner_radius=0.2, color=GREEN, stroke_width=6).set_fill(GREEN, 0.12).move_to(cups[1].get_center() + DOWN * 0.25)
        labels = VGroup(chalk_label("UNWRAPPED", ROSE, 22).next_to(cups[0], DOWN, buff=0.2), chalk_label("WRAPPED", GREEN, 22).next_to(cups[1], DOWN, buff=0.2))
        arrows = VGroup(*[Arrow(cups[0].get_center(), cups[0].get_center() + d * 2.0, color=ORANGE, stroke_width=6) for d in (LEFT, UP)], *[Arrow(cups[1].get_center(), cups[1].get_center() + d * 1.45, color=ORANGE, stroke_width=3) for d in (RIGHT, UP)])
        self.play(FadeIn(cups), Create(wrap), FadeIn(labels), run_time=1.0)
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), run_time=1.0)
        return VGroup(cups, wrap, labels, arrows)

    def visual_insulation_curves(self, timing):
        axes = Axes(x_range=[0, 10, 1], y_range=[0, 10, 1], x_length=7.4, y_length=3.8, tips=False, axis_config={"color": CREAM, "stroke_width": 3}).shift(RIGHT * 1.2 + DOWN * 0.25)
        insulated = axes.plot(lambda x: 8.0 - 2.7 * (1 - math.exp(-x / 5.5)), x_range=[0, 10], color=GREEN, stroke_width=6)
        metal = axes.plot(lambda x: 8.0 - 4.7 * (1 - math.exp(-x / 2.3)), x_range=[0, 10], color=BLUE, stroke_width=6)
        icons = VGroup(RoundedRectangle(width=2.0, height=1.7, corner_radius=0.3, color=GREEN, stroke_width=5).set_fill(GREEN, 0.12), Rectangle(width=2.0, height=1.7, color=BLUE, stroke_width=5).set_fill(BLUE, 0.12)).arrange(DOWN, buff=0.5).shift(LEFT * 4.8)
        labels = VGroup(chalk_label("INSULATED", GREEN, 19).move_to(icons[0]), chalk_label("THIN METAL", BLUE, 19).move_to(icons[1]))
        self.play(FadeIn(icons), FadeIn(labels), Create(axes), run_time=1.0)
        self.play(Create(insulated), Create(metal), run_time=2.2)
        note = chalk_label("better insulation = slower cooling", GOLD, 25).next_to(axes, DOWN, buff=0.35)
        self.play(Write(note), run_time=0.7)
        return VGroup(axes, insulated, metal, icons, labels, note)

    def visual_transfer_story(self, timing):
        cards = VGroup()
        for title, note, color in [("1 OBSERVE", "temperatures", BLUE), ("2 COMPARE", "warmer / cooler", ORANGE), ("3 TRACE", "energy path", GOLD), ("4 EXPLAIN", "particle transfer", GREEN)]:
            box = RoundedRectangle(width=2.55, height=2.75, corner_radius=0.2, color=color, stroke_width=4).set_fill("#10272c", 0.95)
            cards.add(VGroup(box, chalk_label(title, color, 20).shift(UP * 0.55), chalk_label(note, CREAM, 19).shift(DOWN * 0.55)))
        cards.arrange(RIGHT, buff=0.28).shift(DOWN * 0.2)
        for card in cards: card[1:].move_to(card[0])
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.15), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(VGroup(*card[1:])) for card in cards], lag_ratio=0.18), run_time=1.0)
        arrows = VGroup(*[Arrow(cards[i].get_right(), cards[i + 1].get_left(), color=GOLD, stroke_width=4, buff=0.08) for i in range(3)])
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.2), run_time=0.8)
        return VGroup(cards, arrows)

    def visual_melting_timelapse(self, timing):
        frames = VGroup()
        for label, scale, puddle_width in [("0 min", 0.72, 0.4), ("5 min", 0.48, 1.3), ("10 min", 0.2, 2.0)]:
            box = RoundedRectangle(width=3.35, height=3.2, corner_radius=0.2, color=BLUE, stroke_width=4).set_fill("#10272c", 0.92)
            ice = cube(BLUE).scale(scale).move_to(box.get_center() + UP * 0.25)
            puddle = Ellipse(width=puddle_width, height=0.45, color=TEAL, stroke_width=4).set_fill(TEAL, 0.3).move_to(box.get_center() + DOWN * 0.6)
            frames.add(VGroup(box, ice, puddle, chalk_label(label, GOLD, 21).next_to(box, DOWN, buff=0.18)))
        frames.arrange(RIGHT, buff=0.38).shift(DOWN * 0.1)
        self.play(LaggedStart(*[Create(frame[0]) for frame in frames], lag_ratio=0.2), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(VGroup(*frame[1:])) for frame in frames], lag_ratio=0.3), run_time=1.4)
        return frames

    def visual_evidence_frames(self, timing):
        frames = VGroup()
        for title, icon, color in [("FIRST", cube(BLUE).scale(0.45), BLUE), ("MIDDLE", VGroup(cube(BLUE).scale(0.28), Ellipse(width=1.25, height=0.35, color=TEAL)), GOLD), ("FINAL", Ellipse(width=1.8, height=0.48, color=TEAL).set_fill(TEAL, 0.3), TEAL)]:
            box = RoundedRectangle(width=3.35, height=3.0, corner_radius=0.2, color=color, stroke_width=4).set_fill("#10272c", 0.92)
            frames.add(VGroup(box, icon.move_to(box), chalk_label(title, color, 22).next_to(box, DOWN, buff=0.18)))
        frames.arrange(RIGHT, buff=0.4).shift(DOWN * 0.1)
        self.play(LaggedStart(*[FadeIn(frame, shift=RIGHT * 0.15) for frame in frames], lag_ratio=0.3), run_time=1.7)
        note = chalk_label("record what changes - and what stays water", GREEN, 25).next_to(frames, DOWN, buff=0.3)
        self.play(Write(note), run_time=0.7)
        return VGroup(frames, note)

    def visual_material_shelf(self, timing):
        shelf = Line(LEFT * 5.4, RIGHT * 5.4, color="#76563c", stroke_width=12).shift(DOWN * 0.7)
        items = VGroup()
        for name, color in [("ICE", BLUE), ("CHOCOLATE", "#8b5a3c"), ("BUTTER", GOLD), ("WAX", CREAM)]:
            tile = RoundedRectangle(width=2.25, height=1.65, corner_radius=0.2, color=color, stroke_width=4).set_fill(color, 0.14)
            items.add(VGroup(tile, chalk_label(name, color, 21).move_to(tile)))
        items.arrange(RIGHT, buff=0.35).shift(UP * 0.25)
        badge = VGroup(Circle(radius=0.5, color=GREEN, stroke_width=5), chalk_label("CHILD-SAFE", GREEN, 16)).next_to(items[0], UP, buff=0.15)
        app = chalk_label("others: APP OBSERVATION ONLY", RED, 22).next_to(shelf, DOWN, buff=0.42)
        self.play(Create(shelf), LaggedStart(*[FadeIn(item) for item in items], lag_ratio=0.15), run_time=1.1)
        self.play(FadeIn(badge), Write(app), run_time=0.8)
        return VGroup(shelf, items, badge, app)

    def visual_app_sort(self, timing):
        bins = VGroup(*[RoundedRectangle(width=5.0, height=3.4, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10272c", 0.92) for color in (GREEN, RED)]).arrange(RIGHT, buff=0.55).shift(DOWN * 0.2)
        headings = VGroup(chalk_label("PHYSICAL CHANGE", GREEN, 23).next_to(bins[0], UP, buff=-0.45), chalk_label("NEW-SUBSTANCE CLUES", RED, 23).next_to(bins[1], UP, buff=-0.45))
        left = VGroup(chalk_label("melting", CREAM, 21), chalk_label("freezing", CREAM, 21), chalk_label("shape change", CREAM, 21)).arrange(DOWN, buff=0.35).move_to(bins[0])
        right = VGroup(chalk_label("browning", CREAM, 21), chalk_label("burning", CREAM, 21), chalk_label("cooking", CREAM, 21)).arrange(DOWN, buff=0.35).move_to(bins[1])
        self.play(Create(bins), FadeIn(headings), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(item) for item in VGroup(*left, *right)], lag_ratio=0.12), run_time=1.1)
        app = chalk_label("APP-ONLY SORT - no heat experiment", GOLD, 23).next_to(bins, DOWN, buff=0.3)
        self.play(Write(app), run_time=0.7)
        return VGroup(bins, headings, left, right, app)

    def visual_state_claim_repairs(self, timing):
        return self.repair_cards([("melted = gone", "same material"), ("smaller = melted", "check the state"), ("heat makes matter", "energy changes state")])

    def visual_process_compare(self, timing):
        lanes = VGroup(*[RoundedRectangle(width=5.0, height=3.5, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10272c", 0.92) for color in (BLUE, GREEN)]).arrange(RIGHT, buff=0.55).shift(DOWN * 0.2)
        melt = VGroup(cube(BLUE).scale(0.48), Arrow(LEFT * 0.2, RIGHT * 0.5, color=GOLD), Ellipse(width=1.35, height=0.4, color=TEAL).set_fill(TEAL, 0.3)).arrange(RIGHT, buff=0.25).move_to(lanes[0])
        solution = VGroup(VGroup(*[Square(0.16, color=ROSE) for _ in range(6)]).arrange_in_grid(2, 3, buff=0.05), Text("+", color=CREAM), beaker(1.5, 2.0, BLUE)).arrange(RIGHT, buff=0.25).move_to(lanes[1])
        labels = VGroup(chalk_label("ONE MATERIAL: STATE CHANGE", BLUE, 20).next_to(lanes[0], DOWN, buff=0.2), chalk_label("TWO MATERIALS: SOLUTION", GREEN, 20).next_to(lanes[1], DOWN, buff=0.2))
        self.play(Create(lanes), run_time=0.9)
        self.play(FadeIn(melt), FadeIn(solution), FadeIn(labels), run_time=1.1)
        return VGroup(lanes, melt, solution, labels)

    def solution_fair_test(self, left_name, right_name, left_color, right_color, changed):
        cups = VGroup(beaker(2.6, 3.2, BLUE), beaker(2.6, 3.2, BLUE)).arrange(RIGHT, buff=1.8).shift(DOWN * 0.2)
        labels = VGroup(chalk_label(left_name, left_color, 21).next_to(cups[0], DOWN, buff=0.2), chalk_label(right_name, right_color, 21).next_to(cups[1], DOWN, buff=0.2))
        timers = VGroup(*[VGroup(Circle(radius=0.34, color=GOLD, stroke_width=4), Line(ORIGIN, UP * 0.2, color=GOLD, stroke_width=4)).next_to(cup, UP, buff=0.2) for cup in cups])
        self.play(FadeIn(cups), FadeIn(labels), FadeIn(timers), run_time=1.0)
        highlight = SurroundingRectangle(VGroup(cups[1], labels[1]), color=GOLD, buff=0.15, stroke_width=4)
        self.play(Create(highlight), run_time=0.7)
        controls = chalk_label(f"change {changed} only - keep all else equal", GREEN, 24).next_to(cups, DOWN, buff=0.55)
        self.play(Write(controls), run_time=0.7)
        return VGroup(cups, labels, timers, highlight, controls)

    def visual_stirring_fair_test(self, timing):
        group = self.solution_fair_test("NOT STIRRED", "STIRRED", MUTED, GOLD, "stirring")
        spoon = Arc(radius=0.65, start_angle=0.3, angle=1.7 * PI, color=GOLD, stroke_width=5).move_to(group[0][1])
        self.play(Create(spoon), Rotate(spoon, angle=2 * PI), run_time=1.3)
        group.add(spoon)
        return group

    def visual_grain_size_fair_test(self, timing):
        group = self.solution_fair_test("COARSE", "FINE", GOLD, ROSE, "grain size")
        grains = VGroup(VGroup(*[Square(0.22, color=GOLD) for _ in range(5)]).arrange(RIGHT, buff=0.08), VGroup(*[Square(0.1, color=ROSE) for _ in range(14)]).arrange_in_grid(2, 7, buff=0.04))
        for icon, cup in zip(grains, group[0]): icon.next_to(cup, UP, buff=0.65)
        self.play(FadeIn(grains), run_time=0.8)
        group.add(grains)
        return group

    def visual_temperature_fair_test(self, timing):
        group = self.solution_fair_test("COOL", "LUKEWARM", BLUE, ORANGE, "temperature")
        thermos = VGroup(thermometer(15, BLUE).scale(0.5), thermometer(30, ORANGE).scale(0.5))
        for icon, cup in zip(thermos, group[0]): icon.next_to(cup, UP, buff=-0.45)
        self.play(FadeIn(thermos), run_time=0.8)
        group.add(thermos)
        return group

    def visual_solution_conservation(self, timing):
        left = VGroup(VGroup(*[Square(0.16, color=ROSE) for _ in range(8)]).arrange_in_grid(2, 4, buff=0.05), Text("+", color=CREAM), beaker(1.6, 2.1, BLUE)).arrange(RIGHT, buff=0.25).shift(LEFT * 3.0)
        right = beaker(2.4, 3.0, TEAL).shift(RIGHT * 3.0)
        packet1 = RoundedRectangle(width=4.4, height=3.8, corner_radius=0.35, color=CREAM, stroke_width=5).set_fill(CREAM, 0.04).move_to(left)
        packet2 = packet1.copy().move_to(right)
        reads = VGroup(chalk_label("150.0 g", GOLD, 27).next_to(packet1, DOWN, buff=0.22), chalk_label("150.0 g", GOLD, 27).next_to(packet2, DOWN, buff=0.22))
        equals = Text("=", font_size=58, color=GREEN, weight=BOLD)
        self.play(FadeIn(packet1), FadeIn(left), FadeIn(reads[0]), run_time=0.9)
        self.play(FadeIn(equals), FadeIn(packet2), FadeIn(right), FadeIn(reads[1]), run_time=1.0)
        note = chalk_label("closed packet: mass before = mass after", GREEN, 25).next_to(VGroup(packet1, packet2), DOWN, buff=0.65)
        self.play(Write(note), run_time=0.7)
        return VGroup(packet1, packet2, left, right, reads, equals, note)

    def visual_mixture_columns(self, timing):
        columns = VGroup()
        specs = [("SAND", GOLD, "settles"), ("OIL", ORANGE, "layers"), ("EXCESS SALT", ROSE, "crystals remain")]
        for title, color, result in specs:
            box = RoundedRectangle(width=3.35, height=3.5, corner_radius=0.2, color=color, stroke_width=4).set_fill("#10272c", 0.92)
            cup = beaker(1.55, 2.0, BLUE).move_to(box.get_center() + UP * 0.15)
            marker = Rectangle(width=1.05, height=0.22, stroke_width=0).set_fill(color, 0.9).move_to(cup.get_bottom() + UP * (0.38 if result != "layers" else 1.15))
            columns.add(VGroup(box, cup, marker, chalk_label(title, color, 20).next_to(box, UP, buff=-0.38), chalk_label(result, CREAM, 19).next_to(box, DOWN, buff=-0.4)))
        columns.arrange(RIGHT, buff=0.38).shift(DOWN * 0.15)
        self.play(LaggedStart(*[Create(col[0]) for col in columns], lag_ratio=0.2), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(VGroup(*col[1:])) for col in columns], lag_ratio=0.24), run_time=1.2)
        return columns

    def visual_heat_path(self, timing):
        cup = beaker(2.4, 2.8, ORANGE).shift(LEFT * 2.6 + DOWN * 0.25)
        spoon_handle = Line(LEFT * 1.5, RIGHT * 2.0, color=CREAM, stroke_width=13).rotate(-0.15).shift(RIGHT * 0.45 + DOWN * 0.15)
        spoon_bowl = Ellipse(width=1.15, height=0.55, color=CREAM, stroke_width=6).set_fill(CREAM, 0.16).next_to(spoon_handle, RIGHT, buff=-0.24).shift(DOWN * 0.26)
        contact = Circle(radius=0.24, color=GOLD, stroke_width=5).move_to(cup.get_right() + LEFT * 0.18 + DOWN * 0.2)
        path = VMobject(color=GOLD, stroke_width=7)
        path.set_points_smoothly([cup.get_center(), contact.get_center(), spoon_handle.get_center(), spoon_bowl.get_center()])
        labels = VGroup(chalk_label("warmer", ORANGE), chalk_label("cooler", BLUE), chalk_label("contact path", GOLD, 24))
        labels[0].next_to(cup, DOWN, buff=0.2)
        labels[1].next_to(spoon_bowl, DOWN, buff=0.34)
        labels[2].next_to(contact, UP, buff=0.28)
        group = VGroup(cup, spoon_handle, spoon_bowl, contact, path, labels)
        self.play(FadeIn(cup), Create(spoon_handle), Create(spoon_bowl), run_time=1.1)
        self.play(Create(contact), FadeIn(labels[:2]), run_time=0.65)
        self.play(Create(path), FadeIn(labels[2]), run_time=1.25)
        energy = VGroup(*[Dot(radius=0.1, color=GOLD).move_to(path.point_from_proportion(0)) for _ in range(4)])
        self.add(energy)
        for dot_index, dot in enumerate(energy):
            self.play(MoveAlongPath(dot, path), run_time=1.1, rate_func=linear)
            dot.move_to(path.point_from_proportion(0))
        group.add(energy)
        return group

    def visual_thermometer(self, timing):
        cool = thermometer(14, BLUE).shift(LEFT * 2.4 + DOWN * 0.25)
        warm = thermometer(31, ORANGE).shift(RIGHT * 2.4 + DOWN * 0.25)
        read = arrow_label(cool.get_right() + RIGHT * 0.6, warm.get_left() + LEFT * 0.6, "reading changes", GOLD)
        measurement = chalk_label("TEMPERATURE = MEASUREMENT", TEAL, 31).next_to(VGroup(cool, warm), DOWN, buff=0.42)
        self.play(FadeIn(cool), run_time=0.9)
        self.play(GrowArrow(read[0]), FadeIn(read[1]), FadeIn(warm), run_time=1.25)
        self.play(Write(measurement), run_time=0.8)
        return VGroup(cool, warm, read, measurement)

    def visual_conduction(self, timing):
        bar = RoundedRectangle(width=9.5, height=1.15, corner_radius=0.25, color=CREAM, stroke_width=4).set_fill("#506067", 0.55).shift(DOWN * 0.3)
        particles = VGroup(*[Dot(radius=0.15, color=BLUE).move_to(bar.get_left() + RIGHT * (0.55 + index * 0.72)) for index in range(13)])
        source = VGroup(Circle(radius=0.6, color=ORANGE, stroke_width=5).set_fill(ORANGE, 0.22), chalk_label("WARM", ORANGE, 22)).next_to(bar, LEFT, buff=0.2)
        label = chalk_label("neighbour-to-neighbour energy transfer", GOLD, 29).next_to(bar, DOWN, buff=0.38)
        self.play(Create(bar), FadeIn(particles), FadeIn(source), run_time=1.0)
        for index, dot in enumerate(particles):
            self.play(dot.animate.set_color(ORANGE).scale(1.25), run_time=0.18)
            if index > 0:
                self.play(particles[index - 1].animate.scale(0.8), run_time=0.08)
        self.play(Write(label), run_time=0.7)
        fixed = chalk_label("particles vibrate - they do not travel down the spoon", TEAL, 24).next_to(label, DOWN, buff=0.15)
        self.play(FadeIn(fixed), run_time=0.55)
        return VGroup(bar, particles, source, label, fixed)

    def visual_material_compare(self, timing):
        metal = RoundedRectangle(width=4.6, height=2.7, corner_radius=0.2, color=BLUE, stroke_width=4).set_fill("#132b33", 0.95).shift(LEFT * 2.65 + DOWN * 0.2)
        wood = RoundedRectangle(width=4.6, height=2.7, corner_radius=0.2, color=GOLD, stroke_width=4).set_fill("#2b251b", 0.9).shift(RIGHT * 2.65 + DOWN * 0.2)
        metal_label = chalk_label("METAL SPOON", BLUE, 27).next_to(metal, UP, buff=0.25)
        wood_label = chalk_label("WOODEN SPOON", GOLD, 27).next_to(wood, UP, buff=0.25)
        metal_bar = Rectangle(width=0.55, height=0.35, stroke_width=0).set_fill(ORANGE, 1).align_to(metal, LEFT).shift(RIGHT * 0.45)
        wood_bar = Rectangle(width=0.55, height=0.35, stroke_width=0).set_fill(ORANGE, 1).align_to(wood, LEFT).shift(RIGHT * 0.45)
        self.play(Create(metal), Create(wood), FadeIn(metal_label), FadeIn(wood_label), run_time=1.0)
        self.add(metal_bar, wood_bar)
        self.play(metal_bar.animate.stretch_to_fit_width(3.7).align_to(metal, LEFT).shift(RIGHT * 0.45), wood_bar.animate.stretch_to_fit_width(1.65).align_to(wood, LEFT).shift(RIGHT * 0.45), run_time=3.0)
        fair = chalk_label("same length - same start - same water", GREEN, 28).next_to(VGroup(metal, wood), DOWN, buff=0.35)
        self.play(Write(fair), run_time=0.8)
        return VGroup(metal, wood, metal_label, wood_label, metal_bar, wood_bar, fair)

    def graph_scene(self, cooling=False):
        axes = Axes(x_range=[0, 10, 1], y_range=[0, 10, 1], x_length=8.7, y_length=4.1, tips=False, axis_config={"color": CREAM, "stroke_width": 4})
        axes.shift(DOWN * 0.25 + LEFT * 0.15)
        if cooling:
            warm_graph = axes.plot(lambda x: 7.9 - 3.0 * (1 - math.exp(-x / 2.8)), x_range=[0, 10], color=ORANGE, stroke_width=7)
            cool_graph = axes.plot(lambda x: 2.1 + 3.0 * (1 - math.exp(-x / 2.8)), x_range=[0, 10], color=BLUE, stroke_width=7)
            graph = VGroup(warm_graph, cool_graph)
            labels = VGroup(
                chalk_label("warmer object", ORANGE, 21).move_to(axes.c2p(1.7, 7.2)),
                chalk_label("cooler surroundings", BLUE, 21).move_to(axes.c2p(2.0, 2.8)),
                chalk_label("closer together", GOLD, 23).move_to(axes.c2p(7.7, 5.8)),
            )
            rule_text = "both temperatures change"
        else:
            graph = axes.plot(lambda x: 2.1 + 5.7 * (1 - math.exp(-x / 3.0)), x_range=[0, 10], color=ORANGE, stroke_width=7)
            labels = VGroup()
            rule_text = "temperature changes over time"
        xlab = chalk_label("time", MUTED, 23).next_to(axes.x_axis, DOWN, buff=0.15)
        ylab = chalk_label("temperature", MUTED, 23).rotate(PI / 2).next_to(axes.y_axis, LEFT, buff=0.16)
        rule = chalk_label(rule_text, GOLD, 25).next_to(axes, DOWN, buff=0.48)
        self.play(Create(axes), FadeIn(xlab), FadeIn(ylab), run_time=1.0)
        if cooling:
            self.play(Create(graph[0]), Create(graph[1]), run_time=2.8)
            self.play(FadeIn(labels), FadeIn(rule), run_time=0.75)
        else:
            self.play(Create(graph), run_time=2.8)
            self.play(FadeIn(rule), run_time=0.65)
        return VGroup(axes, graph, labels, xlab, ylab, rule)

    def visual_cooling_graph(self, timing):
        return self.graph_scene(cooling=True)

    def visual_heating_graph(self, timing):
        return self.graph_scene(cooling=False)

    def visual_heat_paths(self, timing):
        cards = VGroup()
        specs = [("CONDUCTION", "touching particles", BLUE), ("MOVING FLUID", "warm water or air", TEAL), ("RADIATION", "sunlight", GOLD)]
        for heading, note, color in specs:
            box = RoundedRectangle(width=3.45, height=3.0, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10272c", 0.95)
            icon = VGroup(Circle(radius=0.44, color=color, stroke_width=5), Arrow(LEFT * 0.55, RIGHT * 0.55, color=color, stroke_width=6)).move_to(box.get_center() + UP * 0.42)
            title = chalk_label(heading, color, 24).move_to(box.get_center() + DOWN * 0.45)
            small = chalk_label(note, CREAM, 20).move_to(box.get_center() + DOWN * 0.92)
            cards.add(VGroup(box, icon, title, small))
        cards.arrange(RIGHT, buff=0.36).shift(DOWN * 0.2)
        self.play(LaggedStart(*[Create(card[0]) for card in cards], lag_ratio=0.18), run_time=1.1)
        self.play(LaggedStart(*[FadeIn(VGroup(*card[1:])) for card in cards], lag_ratio=0.18), run_time=1.1)
        return cards

    def visual_melting(self, timing):
        plate = Ellipse(width=5.0, height=1.0, color=CREAM, stroke_width=5).set_fill("#d9e7e8", 0.1).shift(DOWN * 1.55)
        ice = cube(BLUE).shift(LEFT * 2.5 + DOWN * 0.55)
        puddle = Ellipse(width=3.6, height=0.85, color=TEAL, stroke_width=5).set_fill(BLUE, 0.35).shift(RIGHT * 2.1 + DOWN * 1.2)
        token = RoundedRectangle(width=2.3, height=0.65, corner_radius=0.16, color=GOLD, stroke_width=3).set_fill("#10272c", 0.95)
        token_text = chalk_label("MATERIAL: WATER", GOLD, 21).move_to(token)
        token_group = VGroup(token, token_text).next_to(ice, UP, buff=0.35)
        timer = VGroup(Circle(radius=0.52, color=CREAM, stroke_width=4), Line(ORIGIN, UP * 0.32, color=ORANGE, stroke_width=5)).shift(UP * 1.25)
        self.play(Create(plate), FadeIn(ice), FadeIn(timer), FadeIn(token_group), run_time=1.1)
        ghost = ice.copy().set_opacity(0.2)
        self.add(ghost)
        self.play(Transform(ice, puddle), token_group.animate.next_to(puddle, UP, buff=0.35), Rotate(timer[1], angle=1.6 * PI, about_point=timer[0].get_center()), run_time=4.8)
        states = arrow_label(LEFT * 2.1 + DOWN * 2.0, RIGHT * 2.1 + DOWN * 2.0, "solid to liquid", TEAL)
        self.play(GrowArrow(states[0]), FadeIn(states[1]), run_time=0.9)
        return VGroup(plate, ice, ghost, timer, token_group, states)

    def visual_particle_transition(self, timing):
        solid_box = system_boundary(4.7, 3.5, BLUE).shift(LEFT * 2.7 + DOWN * 0.2)
        liquid_box = system_boundary(4.7, 3.5, TEAL).shift(RIGHT * 2.7 + DOWN * 0.2)
        solid = particle_grid(4, 6, 0.42, BLUE).move_to(solid_box)
        liquid = particle_cloud(24, 3.7, 2.2, TEAL, seed=32).move_to(liquid_box)
        same = chalk_label("same particles - new arrangement and motion", GOLD, 28).next_to(VGroup(solid_box, liquid_box), DOWN, buff=0.3)
        arrow = Arrow(solid_box.get_right(), liquid_box.get_left(), buff=0.15, color=GOLD, stroke_width=7)
        self.play(Create(solid_box), FadeIn(solid), run_time=1.0)
        self.play(GrowArrow(arrow), Create(liquid_box), FadeIn(liquid), run_time=1.25)
        self.play(Write(same), run_time=0.75)
        for _ in range(2):
            self.play(AnimationGroup(*[dot.animate.shift(RIGHT * (0.18 if i % 2 else -0.18) + UP * (0.1 if i % 3 else -0.1)) for i, dot in enumerate(liquid)], lag_ratio=0.01), rate_func=there_and_back, run_time=1.6)
        return VGroup(solid_box, solid, liquid_box, liquid, arrow, same)

    def visual_freezing(self, timing):
        tray = RoundedRectangle(width=4.9, height=2.6, corner_radius=0.22, color=CREAM, stroke_width=5).set_fill(BLUE, 0.22).shift(LEFT * 1.8 + DOWN * 0.25)
        liquid = Ellipse(width=3.8, height=0.8, color=TEAL, stroke_width=5).set_fill(TEAL, 0.35).move_to(tray)
        blocks = VGroup(*[RoundedRectangle(width=0.8, height=0.75, corner_radius=0.12, color=BLUE, stroke_width=3).set_fill(BLUE, 0.28) for _ in range(8)]).arrange_in_grid(rows=2, cols=4, buff=0.18).move_to(tray)
        freezer = RoundedRectangle(width=2.7, height=3.8, corner_radius=0.2, color=BLUE, stroke_width=5).set_fill("#122c3a", 0.9).shift(RIGHT * 3.6 + DOWN * 0.25)
        snow = Text("*", font_size=72, color=CREAM, weight=BOLD).move_to(freezer)
        energy = VGroup(*[Arrow(tray.get_right() + UP * y, freezer.get_left() + UP * y, color=ORANGE, stroke_width=5, buff=0.2) for y in (-0.6, 0, 0.6)])
        label = chalk_label("energy leaves the water", ORANGE, 27).next_to(energy, UP, buff=0.15)
        self.play(Create(tray), FadeIn(liquid), Create(freezer), FadeIn(snow), run_time=1.1)
        self.play(LaggedStart(*[GrowArrow(a) for a in energy], lag_ratio=0.15), FadeIn(label), run_time=1.0)
        self.play(ReplacementTransform(liquid, blocks), run_time=3.2)
        state = chalk_label("liquid to solid", BLUE, 30).next_to(tray, DOWN, buff=0.28)
        self.play(Write(state), run_time=0.7)
        return VGroup(tray, blocks, freezer, snow, energy, label, state)

    def visual_shape_compare(self, timing):
        lanes = VGroup()
        for heading, before, after, color in [("SHAPE ONLY", "cube", "crushed ice", GOLD), ("STATE CHANGE", "solid water", "liquid water", TEAL)]:
            box = RoundedRectangle(width=9.6, height=1.65, corner_radius=0.2, color=color, stroke_width=4).set_fill("#10262b", 0.92)
            title = chalk_label(heading, color, 20).move_to(box.get_left() + RIGHT * 1.05)
            left = chalk_label(before, CREAM, 23).move_to(box.get_center() + LEFT * 0.72)
            arrow = Arrow(box.get_center() + RIGHT * 0.18, box.get_center() + RIGHT * 1.24, color=color, stroke_width=6)
            right = chalk_label(after, CREAM, 23).move_to(box.get_center() + RIGHT * 2.72)
            lanes.add(VGroup(box, title, left, arrow, right))
        lanes.arrange(DOWN, buff=0.45).shift(DOWN * 0.15)
        self.play(LaggedStart(*[Create(lane[0]) for lane in lanes], lag_ratio=0.25), run_time=1.0)
        for lane in lanes:
            self.play(FadeIn(lane[1]), FadeIn(lane[2]), GrowArrow(lane[3]), FadeIn(lane[4]), run_time=0.9)
        rule = chalk_label("shape change alone is not melting", ROSE, 29).next_to(lanes, DOWN, buff=0.25)
        self.play(Write(rule), run_time=0.7)
        return VGroup(lanes, rule)

    def visual_safe_setup(self, timing):
        icons = VGroup()
        specs = [("SEALED BAG", GREEN), ("PLATE", TEAL), ("TIMER", GOLD), ("ADULT NEARBY", BLUE)]
        for label, color in specs:
            box = RoundedRectangle(width=2.45, height=2.4, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10272c", 0.95)
            check = Text("OK", font_size=42, color=color, weight=BOLD).move_to(box.get_center() + UP * 0.35)
            caption = chalk_label(label, CREAM, 20).move_to(box.get_center() + DOWN * 0.75)
            icons.add(VGroup(box, check, caption))
        icons.arrange(RIGHT, buff=0.3).shift(DOWN * 0.2)
        self.play(LaggedStart(*[Create(item[0]) for item in icons], lag_ratio=0.15), run_time=1.0)
        self.play(LaggedStart(*[FadeIn(VGroup(*item[1:])) for item in icons], lag_ratio=0.15), run_time=1.0)
        warning = chalk_label("no flame - no boiling - no tasting", RED, 28).next_to(icons, DOWN, buff=0.3)
        self.play(Write(warning), run_time=0.75)
        return VGroup(icons, warning)

    def visual_dissolving(self, timing):
        cup = beaker(3.1, 3.8, BLUE).shift(RIGHT * 1.2 + DOWN * 0.3)
        grains = VGroup(*[Square(side_length=0.18, color=ROSE, stroke_width=2).set_fill(ROSE, 0.85).shift(LEFT * 3.25 + UP * (0.8 + (i % 3) * 0.22) + RIGHT * (i // 3) * 0.24) for i in range(12)])
        spoon = Arc(radius=1.0, start_angle=0.4, angle=1.8 * PI, color=GOLD, stroke_width=6).move_to(cup.get_center() + UP * 0.1)
        water_dots = particle_cloud(22, 2.0, 2.0, BLUE, seed=61).move_to(cup.get_center() + DOWN * 0.35)
        targets = particle_cloud(12, 1.9, 1.8, ROSE, seed=77).move_to(cup.get_center() + DOWN * 0.3)
        label = chalk_label("spread through the water", GREEN, 30).next_to(cup, DOWN, buff=0.3)
        group = VGroup(cup, grains, spoon, water_dots, label)
        self.play(Create(cup), FadeIn(grains), FadeIn(water_dots), run_time=1.1)
        self.play(*[grain.animate.move_to(cup.get_top() + DOWN * 0.6 + RIGHT * ((i % 4) - 1.5) * 0.18) for i, grain in enumerate(grains)], run_time=1.6)
        self.play(Create(spoon), run_time=0.7)
        self.play(Rotate(spoon, angle=2 * PI), *[Transform(grain, target) for grain, target in zip(grains, targets)], run_time=3.0)
        self.play(Write(label), run_time=0.8)
        return group

    def visual_solution_terms(self, timing):
        solute = VGroup(*[Square(side_length=0.22, color=ROSE, stroke_width=2).set_fill(ROSE, 0.8) for _ in range(9)]).arrange_in_grid(3, 3, buff=0.08)
        solvent = beaker(2.4, 3.0, BLUE)
        solution = beaker(2.4, 3.0, TEAL)
        for i in range(10):
            solution.add(Dot(radius=0.06, color=ROSE).shift(RIGHT * ((i % 4) - 1.5) * 0.32 + UP * ((i // 4) - 0.8) * 0.38 + DOWN * 0.55))
        groups = VGroup(solute, solvent, solution).arrange(RIGHT, buff=1.2).shift(DOWN * 0.25)
        labels = VGroup(chalk_label("SOLUTE", ROSE), chalk_label("SOLVENT", BLUE), chalk_label("SOLUTION", GREEN))
        for label, item in zip(labels, groups):
            label.next_to(item, DOWN, buff=0.25)
        arrows = VGroup(Arrow(solute.get_right(), solvent.get_left(), color=GOLD, stroke_width=6), Arrow(solvent.get_right(), solution.get_left(), color=GOLD, stroke_width=6))
        self.play(FadeIn(solute), FadeIn(labels[0]), run_time=0.75)
        self.play(GrowArrow(arrows[0]), FadeIn(solvent), FadeIn(labels[1]), run_time=0.9)
        self.play(GrowArrow(arrows[1]), FadeIn(solution), FadeIn(labels[2]), run_time=0.9)
        return VGroup(groups, labels, arrows)

    def visual_rate_compare(self, timing):
        cups = VGroup(*[beaker(1.8, 2.4, BLUE) for _ in range(3)]).arrange(RIGHT, buff=1.0).shift(DOWN * 0.2)
        labels = VGroup(chalk_label("STIR", GOLD, 22), chalk_label("SMALL GRAINS", ROSE, 22), chalk_label("WARM WATER", ORANGE, 22))
        for label, cup in zip(labels, cups):
            label.next_to(cup, DOWN, buff=0.22)
        timers = VGroup(*[VGroup(Circle(radius=0.34, color=CREAM, stroke_width=3), Line(ORIGIN, UP * 0.2, color=GOLD, stroke_width=4)).next_to(cup, UP, buff=0.28) for cup in cups])
        self.play(LaggedStart(*[FadeIn(cup) for cup in cups], lag_ratio=0.2), run_time=0.9)
        self.play(LaggedStart(*[FadeIn(label) for label in labels], lag_ratio=0.2), FadeIn(timers), run_time=0.9)
        self.play(*[Rotate(timer[1], angle=2 * PI, about_point=timer[0].get_center()) for timer in timers], run_time=2.6)
        fair = chalk_label("change one variable - keep the others fair", GREEN, 28).next_to(labels, DOWN, buff=0.32)
        self.play(Write(fair), run_time=0.8)
        return VGroup(cups, labels, timers, fair)

    def visual_saturation(self, timing):
        cup = beaker(3.3, 4.1, BLUE).shift(DOWN * 0.25)
        dissolved = particle_cloud(22, 2.1, 2.0, ROSE, seed=91).move_to(cup.get_center() + DOWN * 0.35)
        additions = VGroup(*[Square(side_length=0.16, color=ROSE, stroke_width=2).set_fill(ROSE, 0.9) for _ in range(18)]).arrange_in_grid(3, 6, buff=0.08).shift(LEFT * 3.5 + UP * 1.2)
        residue = VGroup(*[Square(side_length=0.14, color=ROSE, stroke_width=1).set_fill(ROSE, 0.9) for _ in range(12)]).arrange(RIGHT, buff=0.04).move_to(cup.get_bottom() + UP * 0.45)
        self.play(Create(cup), FadeIn(dissolved), FadeIn(additions), run_time=1.0)
        self.play(additions.animate.move_to(cup.get_top() + DOWN * 0.65), run_time=1.4)
        self.play(ReplacementTransform(additions, residue), run_time=1.6)
        label = VGroup(chalk_label("solution reached its limit", GOLD, 29), chalk_label("some dissolved - extra remains", CREAM, 24)).arrange(DOWN, buff=0.18).next_to(cup, RIGHT, buff=0.55)
        self.play(FadeIn(label), run_time=0.8)
        return VGroup(cup, dissolved, residue, label)

    def visual_recovery(self, timing):
        dish = Ellipse(width=4.3, height=1.0, color=CREAM, stroke_width=5).set_fill(BLUE, 0.32).shift(LEFT * 2.3 + DOWN * 0.9)
        vapour = VGroup(*[Arrow(LEFT * 0.2, UP * 0.75, color=TEAL, stroke_width=4).shift(LEFT * 3.0 + RIGHT * i * 0.75) for i in range(4)])
        crystals = VGroup(*[Square(side_length=0.2, color=CREAM, stroke_width=2).set_fill(CREAM, 0.85) for _ in range(15)]).arrange_in_grid(3, 5, buff=0.08).shift(RIGHT * 2.6 + DOWN * 0.9)
        arrow = Arrow(dish.get_right(), crystals.get_left(), color=GOLD, stroke_width=7, buff=0.35)
        labels = VGroup(chalk_label("water leaves", TEAL, 25).next_to(vapour, UP, buff=0.2), chalk_label("solute remains", GOLD, 25).next_to(crystals, DOWN, buff=0.2))
        self.play(Create(dish), run_time=0.8)
        self.play(LaggedStart(*[GrowArrow(a) for a in vapour], lag_ratio=0.15), run_time=1.0)
        self.play(GrowArrow(arrow), FadeIn(crystals), FadeIn(labels), run_time=1.2)
        safe = chalk_label("APP-ONLY RECOVERY - NO CHILD-LED BOILING", RED, 24).next_to(VGroup(dish, crystals), DOWN, buff=0.55)
        self.play(Write(safe), run_time=0.75)
        return VGroup(dish, vapour, crystals, arrow, labels, safe)

    def visual_filter_compare(self, timing):
        sand = beaker(2.3, 2.9, BLUE).shift(LEFT * 3.0 + DOWN * 0.2)
        solution = beaker(2.3, 2.9, TEAL).shift(RIGHT * 3.0 + DOWN * 0.2)
        sand_dots = VGroup(*[Dot(radius=0.1, color=GOLD).shift(LEFT * 3.0 + DOWN * (0.55 + (i % 3) * 0.16) + RIGHT * ((i // 3) - 1.5) * 0.25) for i in range(12)])
        salt_dots = particle_cloud(15, 1.5, 1.5, ROSE, seed=100).move_to(solution.get_center() + DOWN * 0.35)
        labels = VGroup(chalk_label("mixture settles", GOLD, 25).next_to(sand, DOWN, buff=0.22), chalk_label("solution stays mixed", GREEN, 25).next_to(solution, DOWN, buff=0.22))
        divider = DashedLine(UP * 2.0, DOWN * 2.1, color=MUTED, dash_length=0.18)
        self.play(FadeIn(sand), FadeIn(solution), FadeIn(sand_dots), FadeIn(salt_dots), Create(divider), run_time=1.1)
        self.play(FadeIn(labels), run_time=0.8)
        return VGroup(sand, solution, sand_dots, salt_dots, labels, divider)

    def visual_sort_board(self, timing):
        headings = ["EVIDENCE", "PROCESS", "EXPLANATION"]
        lanes = VGroup(*[RoundedRectangle(width=3.35, height=3.7, corner_radius=0.22, color=color, stroke_width=4).set_fill("#10272c", 0.92) for color in (TEAL, GOLD, GREEN)]).arrange(RIGHT, buff=0.42).shift(DOWN * 0.25)
        labels = VGroup(*[chalk_label(value, color, 24).next_to(lane, UP, buff=0.2) for value, color, lane in zip(headings, (TEAL, GOLD, GREEN), lanes)])
        cards = VGroup(
            chalk_label("what changed?", CREAM, 22).move_to(lanes[0]),
            chalk_label("melting / dissolving", CREAM, 22).move_to(lanes[1]),
            chalk_label("why does it fit?", CREAM, 22).move_to(lanes[2]),
        )
        self.play(LaggedStart(*[Create(lane) for lane in lanes], lag_ratio=0.2), FadeIn(labels), run_time=1.1)
        self.play(LaggedStart(*[FadeIn(card, shift=UP * 0.2) for card in cards], lag_ratio=0.22), run_time=0.9)
        arrows = VGroup(Arrow(lanes[0].get_right(), lanes[1].get_left(), color=GOLD, stroke_width=5), Arrow(lanes[1].get_right(), lanes[2].get_left(), color=GOLD, stroke_width=5))
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.25), run_time=0.8)
        return VGroup(lanes, labels, cards, arrows)


class ChemistryChapter08Revamp(ChemistryRevampScene):
    chapter_number = 8


class ChemistryChapter09Revamp(ChemistryRevampScene):
    chapter_number = 9


class ChemistryChapter10Revamp(ChemistryRevampScene):
    chapter_number = 10


class ChemistryChapter11Revamp(ChemistryRevampScene):
    chapter_number = 11


def card_palette(chapter):
    return {
        6: ("#dcece8", "#27446f", "#ed9b54"),
        7: ("#dff3f1", "#2f5f86", "#f1ad55"),
        8: ("#e4f2f3", "#2d527d", "#73c5cf"),
        9: ("#f6ebe0", "#26476d", "#e58547"),
        10: ("#e6f3f7", "#315f88", "#72c6d4"),
        11: ("#e7f3ec", "#315879", "#79c38c"),
    }[chapter]


def draw_soft_card(chapter, out_path):
    width, height = 420, 180
    bg, navy, accent = card_palette(chapter)
    image = Image.new("RGB", (width, height), bg)
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-55, -55, 150, 150), fill=(255, 255, 255, 90))
    gd.ellipse((280, 55, 500, 260), fill=(255, 243, 219, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(24))
    image = Image.alpha_composite(image.convert("RGBA"), glow)
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse((116, 138, 315, 165), fill=(20, 45, 55, 22))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    image = Image.alpha_composite(image, shadow)
    draw = ImageDraw.Draw(image, "RGBA")

    if chapter == 8:
        draw.rounded_rectangle((72, 40, 348, 142), radius=25, outline=navy, width=4, fill=(255, 255, 255, 72))
        coords = [(104, 78), (129, 63), (151, 96), (183, 72), (210, 111), (238, 82), (271, 60), (306, 102)]
        for x, y in coords:
            draw.ellipse((x - 8, y - 8, x + 8, y + 8), fill=accent, outline=(255, 255, 255, 230), width=3)
        draw.arc((92, 48, 326, 134), 205, 340, fill=(255, 255, 255, 155), width=4)
    elif chapter == 9:
        draw.rounded_rectangle((78, 54, 180, 140), radius=22, outline="#56b8c5", width=5, fill=(106, 200, 211, 42))
        draw.line((130, 48, 130, 137), fill=accent, width=5)
        draw.line((178, 104, 304, 78), fill=navy, width=11)
        draw.ellipse((294, 58, 365, 98), outline=navy, width=6, fill=(255, 255, 255, 175))
        for x in range(176, 300, 24): draw.polygon([(x, 96), (x + 13, 84), (x + 13, 94)], fill=accent)
        draw.arc((92, 63, 165, 129), 190, 330, fill=(255, 255, 255, 150), width=3)
    elif chapter == 10:
        draw.polygon([(88, 88), (154, 51), (219, 85), (151, 125)], fill="#e9f8fc", outline="white")
        draw.polygon([(151, 125), (219, 85), (219, 130), (151, 166)], fill="#4b759a", outline="white")
        draw.line((231, 108, 286, 108), fill=accent, width=6)
        draw.polygon([(290, 108), (275, 97), (275, 119)], fill=accent)
        draw.ellipse((296, 103, 380, 146), outline="#55bccc", width=7, fill=(85, 188, 204, 48))
        draw.arc((103, 58, 202, 119), 190, 325, fill=(255, 255, 255, 165), width=4)
    elif chapter == 11:
        draw.rounded_rectangle((168, 45, 280, 145), radius=24, outline="#56b8c5", width=5, fill=(92, 185, 201, 42))
        for x, y in [(91, 70), (120, 91), (88, 118), (132, 128)]: draw.rectangle((x, y, x + 16, y + 16), fill="#f5e8d2", outline="white", width=2)
        for x, y in [(193, 80), (236, 70), (212, 108), (251, 124), (187, 132)]: draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=accent, outline="white", width=2)
        draw.arc((160, 33, 289, 153), 205, 335, fill="#e5a641", width=6)
        draw.line((292, 101, 344, 76), fill=navy, width=9)
        draw.ellipse((334, 58, 376, 82), outline=navy, width=5, fill=(255, 255, 255, 170))
    image.convert("RGB").save(out_path, quality=94)


def generate_cards(out_dir):
    output = Path(out_dir)
    output.mkdir(parents=True, exist_ok=True)
    for chapter in range(8, 12):
        draw_soft_card(chapter, output / f"chapter-{chapter:02d}-card.png")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["cards"])
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    if args.command == "cards":
        generate_cards(args.out)


if __name__ == "__main__":
    main()
