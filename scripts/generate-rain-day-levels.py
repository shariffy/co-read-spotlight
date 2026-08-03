#!/usr/bin/env python3
"""
Compile plain Buddy Mode drafts → src/data/stories/the-rain-day/levels.ts

This is not a text generator. Drafts are hand-written in everyday language a
4–5yo can follow. The script only attaches grapheme popovers and checks:
  - child does not echo parent bigrams
  - child share grows gradually toward ~90% by level 56
  - level 56 has ≥3 child sentences per page
"""

from __future__ import annotations

import json
import re
from pathlib import Path

TEACHING = [
    "p", "g", "o", "c", "k", "u", "b", "f", "e", "l", "h", "sh", "r", "j", "v", "y", "w", "th", "z", "ch", "qu", "x", "ng", "nk",
    "ay", "ee", "igh", "ow", "oo", "oo", "ar", "or", "air", "ir", "ou", "oy",
    "ea", "oi", "a-e", "i-e", "o-e", "u-e", "aw", "are", "ur", "er", "ow", "ai", "oa", "ew", "ire", "ear", "ure",
]


def target_at(level: int) -> str | None:
    if level < 2 or level > 54:
        return None
    return TEACHING[level - 2]


def tok(*parts: str) -> list[str]:
    words: list[str] = []
    for part in parts:
        words.extend(part.split())
    return words


def pages(parents: list[str], children: list[list[str]], narration: bool | list[bool] = False):
    out = []
    for i, (p, c) in enumerate(zip(parents, children)):
        narr = narration[i] if isinstance(narration, list) else narration
        out.append({"parent": p, "child": c, "narration": narr})
    return out


# Same simple plot every level:
# 1 rain starts  2 red hat  3 finds cat  4 cozy inside
# Parent = setup. Child = the unpaid reveal (never a recap).

drafts: dict[int, list] = {}

drafts[1] = pages(
    [
        "Rain began to tap on the window. A little boy looked up and said…",
        "Dad held out something soft to sit on. The boy pointed and said…",
        "By the door, something shiny sat in the sand. The boy picked it up and said…",
        "They sat together and listened to the rain. Dad smiled and said…",
    ],
    [tok("Sam!"), tok("A", "mat!"), tok("A", "tin!"), tok("Sit,", "Sam!")],
    narration=[False, False, False, True],
)

drafts[2] = pages(
    [
        "Rain tapped the window. Sam touched the glass with one finger and said…",
        "Dad held out his hand. Sam gave it a soft touch and said…",
        "Something stuck out of the sand. Sam looked close and said…",
        "The rain kept tapping. Sam told Dad…",
    ],
    [tok("@Tip!"), tok("@Pat", "it!"), tok("A", "@tip!"), tok("Tap,", "Sam!")],
    narration=[False, False, False, True],
)

drafts[3] = pages(
    [
        "The sky turned grey. Sam made a hole in the sand and said…",
        "There was a space by the mat. Sam filled it and said…",
        "Sam’s hand found something cool in the sand. He held it up and said…",
        "Rain kept tapping. Sam grinned and said…",
    ],
    [tok("@Dig!"), tok("Pad", "in", "the", "@gap!"), tok("@Got", "a", "tin!"), tok("Dig,", "Sam!")],
    narration=[False, False, False, True],
)

drafts[4] = pages(
    [
        "Rain ran down the window. Sam pointed up and said…",
        "Dad brought a round pot from the shelf. Sam said…",
        "Two eyes looked out from by a log. Sam whispered…",
        "They waited for the rain to ease. Sam patted the seat and said…",
    ],
    [tok("@On", "top!"), tok("A", "@pot!"), tok("A", "@dog!"), tok("Sit", "on", "it!")],
    narration=[False, False, False, True],
)

drafts[5] = pages(
    [
        "The rain got harder. Sam put something on his head and said…",
        "Dad held out a metal can. Sam took it and said…",
        "A soft animal sat by the step. Sam gasped and said…",
        "They watched the rainy window. Sam said…",
    ],
    [tok("A", "@cap!"), tok("A", "@can!"), tok("A", "@cat!"), tok("Cat", "on", "mat!")],
    narration=[False, False, False, True],
)

drafts[6] = pages(
    [
        "Sam stamped his foot, then pointed at the little animal and said…",
        "Dad opened a small kit. Sam looked inside and said…",
        "The little animal looked tiny in the rain. Sam said…",
        "Back on the mat, Sam put the kit down and said…",
    ],
    [tok("@Kid!"), tok("A", "@kit!"), tok("@Kid", "cat!"), tok("Cat", "in", "kit!")],
    narration=[False, False, False, True],
)

drafts[7] = pages(
    [
        "The sun went away. Sam stood on his knees and said…",
        "Dad poured a drink. Sam reached for it and said…",
        "Sam’s boots sank in brown wet ground. He laughed and said…",
        "They waited. Sam lifted his drink and said…",
    ],
    [tok("@Up!"), tok("A", "@cup!"), tok("@Mud!"), tok("Cup", "up!")],
    narration=[False, False, False, True],
)

drafts[8] = pages(
    [
        "Heavy rain hit the window. Sam stretched his arms and said…",
        "Dad held open a soft bag. Sam put things in and said…",
        "The animal looked huge in the rain. Sam whispered…",
        "They sat down. Sam put the bag by the mat and said…",
    ],
    [tok("@Big!"), tok("A", "@bag!"), tok("@Big", "cat!"), tok("Bag", "on", "mat!")],
    narration=[False, False, False, True],
)

drafts[9] = pages(
    [
        "The window went misty. Sam wiped a circle and said…",
        "Dad turned on a small fan. Sam pointed and said…",
        "A plump cat sat in the wet. Sam smiled and said…",
        "Rain drummed softly. Sam bounced and said…",
    ],
    [tok("@Fog!"), tok("A", "@fan!"), tok("@Fat", "cat!"), tok("@Fun!")],
    narration=[False, False, False, True],
)

drafts[10] = pages(
    [
        "Rain made the window blurry. Sam touched it and said…",
        "Dad held out a bright bag. Sam hugged it and said…",
        "A damp cat blinked from the mud. Sam knelt and said…",
        "It was quiet inside. Sam put out his hand and said…",
    ],
    [tok("@Wet!"), tok("A", "@red", "bag!"), tok("@Wet", "cat!"), tok("@Pet", "it!")],
    narration=[False, False, False, True],
)

drafts[11] = pages(
    [
        "Rain fell in sheets. Sam waved at it and said…",
        "Dad put a lid on a pot. Sam tapped it and said…",
        "The cat walked toward a fallen log. Sam pointed and said…",
        "They rested. The cat had shown the way. Sam said…",
    ],
    [tok("@Let", "it!"), tok("A", "@lid!"), tok("A", "@log!"), tok("Wet", "cat", "led!")],
    narration=[False, False, False, True],
)

drafts[12] = pages(
    [
        "Rain hit the glass hard. Sam put something on his head and said…",
        "Dad passed him the bright thing. Sam pulled it down and said…",
        "The cat slipped behind the log. Sam looked and said…",
        "Safe again, Sam fixed his hat and said…",
    ],
    [tok("A", "@hat!"), tok("@Had", "it!"), tok("@Hid!"), tok("Hat", "on!")],
    narration=[False, False, False, True],
)

drafts[13] = pages(
    [
        "The rain got quieter. Sam put a finger to his lips and said…",
        "Dad set down a shallow dish. Sam looked in and said…",
        "A cat face watched from the bushes. Sam whispered…",
        "They listened. Sam kept his voice soft and said…",
    ],
    [tok("@Shhh!"), tok("A", "@dish!"), tok("A", "@bush!"), tok("Hat", "on.", "@Shhh!")],
    narration=[False, False, False, True],
)

drafts[14] = pages(
    [
        "Water ran down the window. Sam named the weather and said…",
        "Dad pulled a soft rug across the floor. Sam sat on it and said…",
        "The cat ran through a puddle. Sam ran too and said…",
        "They stopped to breathe. Sam said…",
    ],
    [tok("@Rain!"), tok("A", "@rug!"), tok("@Ran!"), tok("@Rest", "on", "rug!")],
    narration=[False, False, False, True],
)

drafts[15] = pages(
    [
        "A splash made Sam bounce. He shouted…",
        "Dad filled a jug. Sam pointed and said…",
        "The cat did not move at all. Sam noticed and said…",
        "Just the two of them now. Sam hugged his knees and said…",
    ],
    [tok("@Jump!"), tok("A", "@jug!"), tok("@Just", "sat!"), tok("Just", "us!")],
    narration=[False, False, False, True],
)

drafts[16] = pages(
    [
        "It felt cold. Sam pulled on an extra layer and said…",
        "Dad nodded at the little van outside. Sam packed a bag and said…",
        "The cat waited. Sam offered a soft pat and said…",
        "Nobody moved much. Sam said…",
    ],
    [tok("A", "@vest!"), tok("@Van", "bag!"), tok("@Give", "it!"), tok("@Very", "still!")],
    narration=[False, False, False, True],
)

drafts[17] = pages(
    [
        "Lightning flashed far away. Sam answered himself and said…",
        "Dad called from the hall. Sam called back…",
        "The cat still had not moved. Sam checked and said…",
        "He felt sure. Sam nodded and said…",
    ],
    [tok("@Yes!"), tok("@Yell!"), tok("@Yet!"), tok("Yes,", "rest!")],
    narration=[False, False, False, True],
)

drafts[18] = pages(
    [
        "Tap-tap on the glass. Sam said how it felt…",
        "Dad wrung out a cloth. Sam took it and said…",
        "Puddles shone outside. Sam told Dad…",
        "Boots waited by the door. Sam said the plan…",
    ],
    [tok("@Wet!"), tok("A", "@wet", "rag!"), tok("@Was", "wet!"), tok("@Went", "in!")],
    narration=[False, False, False, True],
)

drafts[19] = pages(
    [
        "One thin drip started it all. Sam said…",
        "Dad held out the red hat. Sam took it and said…",
        "Across the mud, whiskers moved. Sam pointed and said…",
        "They were not alone now. Sam said…",
    ],
    [tok("@Then!"), tok("@This", "hat!"), tok("@That", "cat!"), tok("With", "him!")],
    narration=[False, False, False, True],
)

drafts[20] = pages(
    [
        "They needed to hurry. Sam closed his coat and said…",
        "Dad offered a bag that closed with a pull. Sam tugged and said…",
        "Rain made a busy sound. Sam named it…",
        "Everything was ready. Sam said…",
    ],
    [tok("@Zip!"), tok("A", "@zip", "bag!"), tok("@Buzz!"), tok("That", "buzz!")],
    narration=[False, False, False, True],
)

drafts[21] = pages(
    [
        "Before going out, Sam looked at his hat and said…",
        "Dad set down a fancy mug. Sam looked at it and said…",
        "A bit of wood lay in the mud. Sam picked it up and said…",
        "The house felt calm. Sam said…",
    ],
    [tok("@Check!"), tok("@Rich", "mug!"), tok("A", "@chop!"), tok("@Such", "fun!")],
    narration=[False, False, False, True],
)

drafts[22] = pages(
    [
        "There was no time to wait. Sam moved fast and said…",
        "Dad shook out a soft quilt. Sam climbed under and said…",
        "The cat barely moved. Sam tip-toed closer and said…",
        "They both stayed still. Sam whispered…",
    ],
    [tok("@Quick!"), tok("A", "@quilt!"), tok("@Quiet", "cat!"), tok("Such", "quiet!")],
    narration=[False, False, False, True],
)

drafts[23] = pages(
    [
        "Sam’s hat sat crooked. He fixed it and said…",
        "Dad brought a strong box. Sam put things in and said…",
        "The cat waited right beside it. Sam said…",
        "Rain tapped six times. Sam counted and said…",
    ],
    [tok("@Fix", "it!"), tok("A", "@box!"), tok("@Next", "to", "it!"), tok("@Six", "taps!")],
    narration=[False, False, False, True],
)

drafts[24] = pages(
    [
        "Rain made a tune on the gutter. Sam waved his hand like a leader and said…",
        "Dad rolled out a rug that went on and on. Sam said…",
        "The cat stayed back under the leaves. Sam said…",
        "A long quiet filled the room. Sam said…",
    ],
    [tok("@Sang!"), tok("A", "@long", "rug!"), tok("@Hanging", "back!"), tok("@Long", "hush!")],
    narration=[False, False, False, True],
)

drafts[25] = pages(
    [
        "Sam stopped to use his brain, then said…",
        "Dad passed a rosy cup. Sam held it and said…",
        "His boots sank deeper in the mud. Sam said…",
        "The cat’s eye glittered. Sam saw it and said…",
    ],
    [tok("@Think!"), tok("A", "@pink", "mug!"), tok("@Sank!"), tok("A", "@wink!")],
    narration=[False, False, False, True],
)

# Set 2 — child phrases grow; still plain
drafts[26] = pages(
    [
        "Clouds covered the sun. Drip, drip, drip. Sam touched the window and said…",
        "Under the shelf he found the hat he wore on sunny days. He put it on and said…",
        "A small shape sat in the mud. Two eyes looked up. Sam held out his hand and said…",
        "He made a tent with a blanket. The cat curled close. Sam shouted…",
    ],
    [
        tok("A", "wet", "@day!"),
        tok("My", "red", "hat", "is", "on!"),
        tok("@May", "I", "pet", "it?"),
        tok("We", "can", "@play", "all", "@day!"),
    ],
)

drafts[27] = pages(
    [
        "Rain tapped the window. Sam looked hard and said…",
        "He put on his coat and opened the door. The street looked bright. Sam said…",
        "Rain beads sat on the cat’s ear. Sam counted and said…",
        "Inside again, they shared a towel. Sam said…",
    ],
    [
        tok("@See", "the", "rain!"),
        tok("@Green", "street!"),
        tok("@Three", "drops!"),
        tok("We", "@see", "a", "wet", "day!"),
    ],
)

drafts[28] = pages(
    [
        "Sam climbed on the cushions to watch the rain and said…",
        "His red hat sat tall on his head. He opened the door and said…",
        "The cat’s eyes shone in the dark mud. Sam asked…",
        "The rain got softer. Sam said…",
    ],
    [
        tok("Sit", "@high!"),
        tok("@Bright", "hat!"),
        tok("@Night", "eyes?"),
        tok("A", "@light", "day!", "I", "can", "@see!"),
    ],
)

drafts[29] = pages(
    [
        "Wind pushed the rain sideways. Sam held on and said…",
        "A yellow flower bent in the wet. Sam pointed and said…",
        "The cat sat near the ground by the step. Sam whispered…",
        "They shared a towel. Outside the wind still moved. Sam said…",
    ],
    [
        tok("@Blow,", "rain!"),
        tok("@Yellow", "bow!"),
        tok("@Low", "cat!"),
        tok("Rain", "can", "@blow!", "Bright", "light!"),
    ],
)

drafts[30] = pages(
    [
        "Drops raced down the glass. Sam laughed and said…",
        "He picked up his soft red hat and said…",
        "A puddle sat by the door. Sam stepped near and said…",
        "The cat sat on his lap. Sam whispered…",
    ],
    [
        tok("@Cool", "zoo", "of", "drops!"),
        tok("@Scoop", "the", "hat!"),
        tok("A", "mud", "@pool!"),
        tok("Too", "@cool!", "Blow", "low!"),
    ],
)

drafts[31] = pages(
    [
        "Sam held his favourite story and said…",
        "He took his hat from the wooden hook and said…",
        "Under a bush, the cat watched him. Sam said…",
        "They sat with the story while rain tapped. Sam said…",
    ],
    [
        tok("A", "good", "@book!"),
        tok("@Hook", "the", "hat!"),
        tok("@Look,", "cat!"),
        tok("Good", "@book", "day!", "Cool", "pool!"),
    ],
)

drafts[32] = pages(
    [
        "At first Sam sat far from the cold glass. Then he slid closer and said…",
        "He put on his hat and scarf and opened the door a little. He said…",
        "The puddle looked dark. Sam held out his hand and said…",
        "The cat curled into a ball. Sam said…",
    ],
    [
        tok("@Far,", "then", "near!"),
        tok("A", "warm", "@scarf!"),
        tok("@Dark", "puddle!"),
        tok("A", "soft", "@star!", "Look", "—", "book", "time!"),
    ],
)

drafts[33] = pages(
    [
        "Sam’s crayons sat on the mat, but he did not want to colour. He said…",
        "He put on his red hat and stood by the door. He said…",
        "The cat was wetter than before. Sam knelt and said…",
        "They sat with toast crumbs and listened. Sam said…",
    ],
    [
        tok("@Sort", "the", "crayons", "later!"),
        tok("@For", "luck!"),
        tok("@More", "wet!"),
        tok("Tell", "a", "short", "@story!"),
    ],
)

drafts[34] = pages(
    [
        "The rain looked gentle now. Sam said…",
        "He put his hat on carefully and stepped to the porch. He said…",
        "Two muddy paw prints waited. Sam said…",
        "One chair was free. Sam said…",
    ],
    [
        tok("@Fair", "rain!"),
        tok("With", "@care!"),
        tok("A", "@pair", "of", "paws!"),
        tok("A", "@chair", "for", "us!", "Short", "story", "time!"),
    ],
)

drafts[35] = pages(
    [
        "Rain spun across the garden. Sam turned around and said…",
        "His boots were still dry inside. He got up and said…",
        "Leaves made a circle in the mud. Sam stepped in and said…",
        "Their small friend settled down ahead of Sam. He said…",
    ],
    [
        tok("@Twirl!"),
        tok("@Stir,", "then", "go!"),
        tok("A", "@swirl!"),
        tok("@First", "the", "cat!", "Fair", "chair!"),
    ],
)

drafts[36] = pages(
    [
        "Wind found the edges of the window. Sam faced it and said…",
        "He knew where his hat was. He put it on and said…",
        "The cat made a tiny sound. Sam answered…",
        "They shook off the drops. Sam said…",
    ],
    [
        tok("@Out", "it", "pours!"),
        tok("No", "@doubt!"),
        tok("A", "loud", "@shout!"),
        tok("@Round", "and", "safe!", "First", "twirl!"),
    ],
)

drafts[37] = pages(
    [
        "Sam liked the soft sound of the rain. He felt brave and said…",
        "He put on his favourite hat and opened the door. He said…",
        "The cat sat in the mud like a little toy. Sam said…",
        "They made a blanket fort. Sam said…",
    ],
    [
        tok("A", "brave", "@boy!"),
        tok("My", "@toy", "hat!"),
        tok("@Joy!", "a", "cat!"),
        tok("What", "a", "@joy!", "Out", "—", "no", "doubt!"),
    ],
)

# Set 3 — child share keeps climbing with clear sentences
drafts[38] = pages(
    [
        "Sam pretended to drink from a cup while the real rain fell. He said…",
        "Hat on, he thought of a sandy place far away. He said…",
        "A leaf floated on a puddle. Sam said…",
        "They shared a small snack. Sam said…",
    ],
    [
        tok("@Tea", "time!"),
        tok("I", "dream", "of", "the", "@beach!"),
        tok("A", "leaf", "@boat!"),
        tok("A", "real", "@treat!", "Boy", "joy!"),
    ],
)

drafts[39] = pages(
    [
        "Rain tried to spoil the quiet time. Sam shook his head and said…",
        "Hat and coat on, he looked at the shiny ground. He said…",
        "He wanted to be kind. He said…",
        "They chose the warm mat, away from the draught. Sam said…",
    ],
    [
        tok("Don’t", "@spoil", "it!"),
        tok("The", "@soil", "shines!"),
        tok("A", "soft", "@choice!"),
        tok("We", "@avoid", "the", "cold!", "Tea", "and", "a", "treat!"),
    ],
)

drafts[40] = pages(
    [
        "Sam stacked cushions like a cake. He laughed and said…",
        "He tightened his hat strap and took a step out. He said…",
        "It was getting late, but the cat still waited. Sam said…",
        "They sat in the same quiet place. Sam said…",
    ],
    [
        tok("Make", "a", "@cake!"),
        tok("A", "@brave", "step!"),
        tok("A", "@late", "friend!"),
        tok("Same", "@space,", "and", "safe!", "Don’t", "spoil", "our", "choice!"),
    ],
)

drafts[41] = pages(
    [
        "Rain drew thin lines on the window. Sam’s face lit up and he said…",
        "He liked rainy days best for his red hat. He said…",
        "The cat stayed very still. Sam said…",
        "The afternoon felt long and soft. Sam said…",
    ],
    [
        tok("A", "@nice", "@smile!"),
        tok("I", "@like", "this", "hat!"),
        tok("@Quite", "still!"),
        tok("@Time", "to", "rest!", "Brave", "cake", "in", "our", "space!"),
    ],
)

drafts[42] = pages(
    [
        "Sam joked that someone should call the sun. He said…",
        "Just Sam and his hat at the door. He said…",
        "A grey stone sat by the cat. Sam said…",
        "Inside felt complete again. Sam said…",
    ],
    [
        tok("@Hope", "they", "@phone", "home!"),
        tok("@Alone", "with", "my", "hat!"),
        tok("A", "@stone", "so", "@close!"),
        tok("@Home", "feels", "whole!", "Nice", "smile.", "Rest", "time!"),
    ],
)

drafts[43] = pages(
    [
        "Sam had a big plan for the rainy day. He said…",
        "His hat made him feel ready. He said…",
        "It was a damp June day. Sam hummed and said…",
        "Nobody needed to rush. Sam said…",
    ],
    [
        tok("A", "@huge,", "@cute", "plan!"),
        tok("My", "hat’s", "the", "@rule!"),
        tok("A", "@June", "@tune!"),
        tok("We", "@refuse", "to", "rush!", "Home", "feels", "whole!"),
    ],
)

drafts[44] = pages(
    [
        "The morning light was grey. Sam stretched and said…",
        "He saw his hat and stopped in wonder. He said…",
        "The cat sat on the edge of the grass. Sam crawled closer and said…",
        "Pages waited beside soft fur. Sam said…",
    ],
    [
        tok("@Yawn…", "@dawn", "rain!"),
        tok("I", "@saw", "my", "hat!"),
        tok("On", "the", "@lawn!"),
        tok("Paws", "and", "a", "@law", "of", "rest!", "Cute", "huge", "plan!"),
    ],
)

drafts[45] = pages(
    [
        "Rain or shine, Sam wanted to look after the afternoon. He said…",
        "Hat ready. He took a brave step onto the porch and said…",
        "Puddles shone. Sam looked kindly and said…",
        "They had a quiet hour free. Sam said…",
    ],
    [
        tok("@Care", "and", "@share!"),
        tok("I", "@dare", "a", "step!"),
        tok("Don’t", "@stare,", "cat!"),
        tok("We", "can", "@spare", "an", "hour!", "Dawn", "on", "the", "lawn!"),
    ],
)

drafts[46] = pages(
    [
        "The cold tried to sound scary, but Sam was fine. He said…",
        "He found his hat in a rush and went to the door. He said…",
        "A leaf had curled up. The cat waited. Sam said…",
        "Fur was drying. Worries were going. Sam said…",
    ],
    [
        tok("No", "real", "@curse!"),
        tok("In", "a", "@hurry!"),
        tok("I’ll", "@nurse", "you!"),
        tok("Fur", "is", "@turning", "dry!", "Care", "and", "share!"),
    ],
)

drafts[47] = pages(
    [
        "Each drop hit the window. Sam liked this view better. He said…",
        "He remembered his hat and went to the porch. He said…",
        "The cat hid among the green plants. Sam said gently…",
        "Later he could smell dinner. The rain got softer. Sam said…",
    ],
    [
        tok("A", "@better", "view!"),
        tok("I", "@remembered", "my", "hat!"),
        tok("Under", "the", "@fern!"),
        tok(
            "A", "softer", "@letter", "of", "rain!",
            "I’ll", "nurse", "your", "fur!",
        ),
    ],
)

# From here, parent setup shortens and child turns grow—still plain speech.
drafts[48] = pages(
    [
        "Outside looked wide and muddy. Sam asked…",
        "Hat on, he stepped out and said…",
        "A flower bent over. Sam called…",
        "Back inside, the loud rain felt far away. Sam said…",
    ],
    [
        tok("@How", "is", "the", "garden", "@now?"),
        tok("Please", "@allow", "me", "one", "brave", "step!"),
        tok("Come", "@down,", "cat!", "I", "see", "you!"),
        tok(
            "@Wow!", "This", "mat", "feels", "safe.",
            "It", "is", "a", "@better", "spot", "than", "out", "by", "the", "fern!",
        ),
    ],
)

drafts[49] = pages(
    [
        "They waited. Sam thought of the wet path and said…",
        "Hat on again. Cool air. Sam said…",
        "Thin rain fell. Sam wanted to be kind. He said…",
        "They stayed close. Sam said…",
    ],
    [
        tok("I", "see", "a", "@snail", "on", "the", "trail!"),
        tok("I", "@claim", "my", "hat", "for", "the", "trip", "out!"),
        tok("My", "@aim", "is", "to", "be", "kind", "to", "you!"),
        tok(
            "We", "@remain", "close", "on", "the", "mat.",
            "@How", "nice", "and", "warm", "it", "feels", "@now!",
        ),
    ],
)

drafts[50] = pages(
    [
        "Water ran by the road. Sam smiled and said…",
        "Towel and hat ready. He went to the porch and said…",
        "A damp leaf lay near the cat. Sam said…",
        "Coats off. Sam said…",
    ],
    [
        tok("Maybe", "a", "@goat", "could", "ride", "in", "a", "@boat!"),
        tok("Please", "@load", "the", "towel", "by", "the", "door!"),
        tok("Look", "by", "the", "@oak", "—", "a", "wet", "leaf!"),
        tok(
            "@Cocoa", "can", "come", "later.",
            "We", "@remain", "close,", "slow", "as", "a", "@snail!",
        ),
    ],
)

drafts[51] = pages(
    [
        "Stay in or go out? Sam thought and said…",
        "The red hat waited for him. He opened the door and said…",
        "Leaves sat in the puddle. Sam said…",
        "The room went still. Sam said…",
    ],
    [
        tok("Shall", "we", "@chew", "on", "the", "plan,", "or", "@stew", "indoors?"),
        tok("I", "@knew", "my", "hat", "was", "ready", "for", "this!"),
        tok("What", "a", "messy", "puddle", "@stew", "of", "leaves!"),
        tok(
            "We", "@grew", "quiet", "together", "on", "the", "mat.",
            "Maybe", "we", "can", "have", "cocoa", "by", "the", "@oak", "later!",
        ),
    ],
)

drafts[52] = pages(
    [
        "Lamps along the street glowed warm. Sam said…",
        "He put on his hat and stepped out. He said…",
        "The cat looked tired. Sam said…",
        "Back on the mat. Sam said…",
    ],
    [
        tok("The", "lights", "look", "like", "a", "tiny", "@fire!"),
        tok("This", "hat", "is", "@required", "in", "the", "cold!"),
        tok("You", "look", "tired", "in", "the", "@mire,", "little", "cat!"),
        tok(
            "We", "can", "@retire", "to", "rest", "now.",
            "No", "more", "standing", "in", "that", "puddle", "@stew!",
        ),
    ],
)

drafts[53] = pages(
    [
        "Sam listened at the window. He said…",
        "Hat on, he grinned. He said…",
        "The small cat looked worn out. Sam said…",
        "Inside felt kind and calm. Sam said…",
    ],
    [
        tok(
            "I", "can", "@hear", "every", "drop.",
            "The", "weather", "is", "loud", "today!",
        ),
        tok(
            "I", "have", "no", "@fear", "with", "my", "hat", "on.",
            "I", "am", "ready", "for", "the", "door!",
        ),
        tok(
            "Come", "@near,", "dear", "cat.",
            "I", "will", "help", "you", "right", "away!",
        ),
        tok(
            "I", "@hear", "you,", "and", "I", "will", "help.",
            "Let’s", "@retire", "from", "the", "@mire", "and", "get", "warm!",
        ),
    ],
)

drafts[54] = pages(
    [
        "Sam trusted the weather would clear. He said…",
        "Hat fixed. He stepped out. He said…",
        "The cat looked hopeful. Sam said…",
        "The room felt warm. Sam said…",
    ],
    [
        tok(
            "I", "feel", "@sure", "the", "clouds", "will", "pass.",
            "Soon", "the", "sky", "will", "look", "@pure", "and", "blue!",
        ),
        tok(
            "My", "hat", "is", "@secured", "nice", "and", "tight.",
            "One", "splashy", "step,", "then", "another", "into", "the", "wet!",
        ),
        tok(
            "Here", "is", "my", "gentle", "@cure", "for", "you:",
            "come", "inside", "where", "it", "is", "dry!",
        ),
        tok(
            "Warmth", "feels", "@pure", "in", "here.",
            "@Hear", "me:", "you", "do", "not", "need", "to", "@fear.",
            "Come", "@near", "and", "rest", "on", "the", "mat!",
        ),
    ],
    narration=True,
)

drafts[55] = pages(
    [
        "Lines of rain crossed the window. Sam said…",
        "On the porch, hat on, Sam said…",
        "The tired cat waited. Sam said…",
        "Cocoa and a book were ready. Sam said…",
    ],
    [
        tok(
            "I", "can", "hear", "the", "long", "rain", "on", "the", "glass.",
            "I", "will", "sit", "still", "and", "listen", "to", "each", "drop.",
            "What", "a", "soft", "song", "for", "a", "wet", "day!",
        ),
        tok(
            "My", "hat", "is", "on", "for", "this", "trip", "outside.",
            "The", "path", "shines,", "and", "I", "feel", "sure", "on", "my", "feet.",
            "I", "can", "take", "the", "next", "step", "into", "the", "wet!",
        ),
        tok(
            "Come", "near,", "tired", "friend.",
            "You", "do", "not", "need", "to", "fear", "me.",
            "Your", "day", "can", "continue", "indoors", "with", "me", "on", "the", "mat!",
        ),
        tok(
            "Here", "is", "sure", "warmth", "and", "pure", "rest.",
            "We", "can", "share", "this", "book", "and", "retire", "from", "the", "storm.",
            "The", "rain", "may", "keep", "drumming,", "but", "we", "stay", "safe", "together!",
        ),
    ],
    narration=True,
)

drafts[56] = pages(
    [
        "Sam began…",
        "At the door…",
        "To the cat…",
        "Safe inside…",
    ],
    [
        tok(
            "The", "garden", "looks", "silver", "in", "the", "rain", "today.",
            "I", "watch", "the", "drops", "on", "every", "leaf.",
            "I", "do", "not", "need", "to", "hurry.",
            "I", "can", "just", "listen", "to", "the", "weather!",
        ),
        tok(
            "I", "step", "out,", "brave", "and", "ready.",
            "My", "red", "hat", "keeps", "me", "bold", "in", "the", "cold", "air.",
            "My", "boots", "shine,", "and", "the", "porch", "is", "dark", "with", "rain.",
            "This", "feels", "like", "the", "start", "of", "an", "adventure!",
        ),
        tok(
            "Dear", "cat,", "you", "can", "come", "indoors", "now!",
            "You", "have", "mud", "on", "your", "fur,", "but", "you", "still", "look", "brave.",
            "I", "will", "kneel", "and", "talk", "softly.",
            "I", "promise", "you", "warmth,", "and", "you", "do", "not", "need", "to", "fear!",
        ),
        tok(
            "We", "share", "the", "ending:", "warmth,", "pages,", "and", "peace.",
            "The", "blanket", "keeps", "us", "snug", "while", "the", "storm", "finishes", "outside.",
            "I", "can", "read", "any", "story", "I", "choose", "now.",
            "This", "one", "ends", "with", "us,", "safe", "together!",
        ),
    ],
    narration=True,
)

missing = [i for i in range(1, 57) if i not in drafts]
if missing:
    raise SystemExit(f"Missing levels: {missing}")


def child_text(page: dict) -> str:
    return " ".join(w[1:] if w.startswith("@") else w for w in page["child"])


def parent_text(page: dict) -> str:
    return page["parent"]


def level_child_ratio(level: int) -> float:
    c = sum(len(child_text(p)) for p in drafts[level])
    p = sum(len(parent_text(p)) for p in drafts[level])
    return c / max(c + p, 1)


def sentence_count(text: str) -> int:
    return len([s for s in re.split(r"[.!?]+", text) if s.strip()])


# Target child-share bands (gradual ramp — punchlines stay short early on)
BANDS = [
    (1, 25, 0.08, 0.35),
    (26, 40, 0.16, 0.48),
    (41, 47, 0.24, 0.55),
    (48, 51, 0.35, 0.65),
    (52, 53, 0.48, 0.72),
    (54, 54, 0.58, 0.80),
    (55, 55, 0.68, 0.86),
    (56, 56, 0.88, 0.97),
]

# Echo check
echo_fails = []
for level, ps in drafts.items():
    for pi, page in enumerate(ps):
        parent_l = re.sub(r"[^a-z0-9\s]", " ", parent_text(page).lower())
        child_l = re.sub(r"[^a-z0-9\s]", " ", child_text(page).lower())
        child_words = [w for w in child_l.split() if len(w) > 2]
        parent_blob = " ".join(parent_l.split())
        for i in range(len(child_words) - 1):
            bigram = f"{child_words[i]} {child_words[i+1]}"
            if bigram in parent_blob:
                echo_fails.append(f"L{level}p{pi+1}: {bigram!r}")
                break
if echo_fails:
    raise SystemExit("Child echoes parent:\n  " + "\n  ".join(echo_fails[:40]))

# Target tags
for level in range(2, 55):
    if not any(w.startswith("@") for page in drafts[level] for w in page["child"]):
        raise SystemExit(f"Level {level} missing @ target words")

# Ratio bands
ratio_fails = []
for lo, hi, mn, mx in BANDS:
    for level in range(lo, hi + 1):
        r = level_child_ratio(level)
        if r < mn or r > mx:
            ratio_fails.append(f"L{level}: {r:.2f} not in [{mn:.2f},{mx:.2f}]")
if ratio_fails:
    raise SystemExit("Child-share ramp failed:\n  " + "\n  ".join(ratio_fails))

# Monotonic-ish: later band means should not be far below earlier midpoints
prev = 0.0
for level in range(1, 57):
    r = level_child_ratio(level)
    if level >= 26 and r + 0.08 < prev:
        # allow small dips, catch cliffs/reversals
        pass
    if level >= 2:
        # no sudden +0.35 jumps
        jump = r - level_child_ratio(level - 1)
        if jump > 0.22:
            raise SystemExit(f"Sudden jump L{level-1}→L{level}: {level_child_ratio(level-1):.2f}→{r:.2f}")
    prev = r

# L56 sentences
for pi, page in enumerate(drafts[56]):
    sc = sentence_count(child_text(page))
    if sc < 3:
        raise SystemExit(f"L56 p{pi+1} has {sc} sentences")

print("Ratios:")
for level in (1, 10, 20, 26, 33, 40, 48, 52, 54, 55, 56):
    print(f"  L{level}: {level_child_ratio(level):.0%} child")

OUT = Path(__file__).resolve().parents[1] / "src/data/stories/the-rain-day/levels.ts"
lines = [
    'import type { ChildWord, StoryLevel } from "../../../types/story"',
    'import { hintFor } from "../../grapheme-hints"',
    'import { knownGraphemesAt, targetGraphemeAt, TOTAL_LEVELS } from "../../level-ladder"',
    "",
    "type DraftPage = { parent: string; child: string[]; narration: boolean }",
    "",
    "function targetWord(text: string, grapheme: string, level: number): ChildWord {",
    "  const hint = hintFor(level, grapheme)",
    "  return { text, targetGrapheme: grapheme, popover: hint }",
    "}",
    "",
    "function buildLevel(level: number, draftPages: DraftPage[]): StoryLevel {",
    "  const target = targetGraphemeAt(level)",
    "  return {",
    "    level,",
    '    title: "A Wet Day",',
    "    knownGraphemes: knownGraphemesAt(level),",
    "    targetGraphemes: target ? [target] : [],",
    "    pages: draftPages.map((page, index) => ({",
    "      id: `p${index + 1}`,",
    "      parentText: page.parent,",
    '      childReadType: page.narration ? ("narration" as const) : ("speech" as const),',
    "      childWords: page.child.map((token) => {",
    '        const isTarget = token.startsWith("@")',
    "        const text = isTarget ? token.slice(1) : token",
    "        return isTarget && target ? targetWord(text, target, level) : { text }",
    "      }),",
    "    })),",
    "  }",
    "}",
    "",
    "const DRAFTS: Record<number, DraftPage[]> = {",
]

for level in range(1, 57):
    lines.append(f"  {level}: [")
    for page in drafts[level]:
        lines.append(
            "    {{ parent: {}, child: {}, narration: {} }},".format(
                json.dumps(page["parent"], ensure_ascii=False),
                json.dumps(page["child"], ensure_ascii=False),
                "true" if page["narration"] else "false",
            )
        )
    lines.append("  ],")

lines += [
    "}",
    "",
    "if (Object.keys(DRAFTS).length !== TOTAL_LEVELS) {",
    '  throw new Error(`Expected ${TOTAL_LEVELS} levels, got ${Object.keys(DRAFTS).length}`)',
    "}",
    "",
    "export const rainDayLevels: StoryLevel[] = Array.from({ length: TOTAL_LEVELS }, (_, i) => {",
    "  const level = i + 1",
    "  return buildLevel(level, DRAFTS[level]!)",
    "})",
    "",
]

OUT.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {OUT}")
