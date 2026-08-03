import type { ChildWord, StoryLevel } from "../../../types/story"
import { hintFor } from "../../grapheme-hints"
import { knownGraphemesAt, targetGraphemeAt, TOTAL_LEVELS } from "../../level-ladder"

type DraftPage = { parent: string; child: string[]; narration: boolean }

function targetWord(text: string, grapheme: string, level: number): ChildWord {
  const hint = hintFor(level, grapheme)
  return { text, targetGrapheme: grapheme, popover: hint }
}

function buildLevel(level: number, draftPages: DraftPage[]): StoryLevel {
  const target = targetGraphemeAt(level)
  return {
    level,
    title: "A Wet Day",
    knownGraphemes: knownGraphemesAt(level),
    targetGraphemes: target ? [target] : [],
    pages: draftPages.map((page, index) => ({
      id: `p${index + 1}`,
      parentText: page.parent,
      childReadType: page.narration ? ("narration" as const) : ("speech" as const),
      childWords: page.child.map((token) => {
        const isTarget = token.startsWith("@")
        const text = isTarget ? token.slice(1) : token
        return isTarget && target ? targetWord(text, target, level) : { text }
      }),
    })),
  }
}

const DRAFTS: Record<number, DraftPage[]> = {
  1: [
    { parent: "Rain began to tap on the window. A little boy looked up and said…", child: ["Sam!"], narration: false },
    { parent: "Dad held out something soft to sit on. The boy pointed and said…", child: ["A", "mat!"], narration: false },
    { parent: "By the door, something shiny sat in the sand. The boy picked it up and said…", child: ["A", "tin!"], narration: false },
    { parent: "They sat together and listened to the rain. Dad smiled and said…", child: ["Sit,", "Sam!"], narration: true },
  ],
  2: [
    { parent: "Rain tapped the window. Sam touched the glass with one finger and said…", child: ["@Tip!"], narration: false },
    { parent: "Dad held out his hand. Sam gave it a soft touch and said…", child: ["@Pat", "it!"], narration: false },
    { parent: "Something stuck out of the sand. Sam looked close and said…", child: ["A", "@tip!"], narration: false },
    { parent: "The rain kept tapping. Sam told Dad…", child: ["Tap,", "Sam!"], narration: true },
  ],
  3: [
    { parent: "The sky turned grey. Sam made a hole in the sand and said…", child: ["@Dig!"], narration: false },
    { parent: "There was a space by the mat. Sam filled it and said…", child: ["Pad", "in", "the", "@gap!"], narration: false },
    { parent: "Sam’s hand found something cool in the sand. He held it up and said…", child: ["@Got", "a", "tin!"], narration: false },
    { parent: "Rain kept tapping. Sam grinned and said…", child: ["Dig,", "Sam!"], narration: true },
  ],
  4: [
    { parent: "Rain ran down the window. Sam pointed up and said…", child: ["@On", "top!"], narration: false },
    { parent: "Dad brought a round pot from the shelf. Sam said…", child: ["A", "@pot!"], narration: false },
    { parent: "Two eyes looked out from by a log. Sam whispered…", child: ["A", "@dog!"], narration: false },
    { parent: "They waited for the rain to ease. Sam patted the seat and said…", child: ["Sit", "on", "it!"], narration: true },
  ],
  5: [
    { parent: "The rain got harder. Sam put something on his head and said…", child: ["A", "@cap!"], narration: false },
    { parent: "Dad held out a metal can. Sam took it and said…", child: ["A", "@can!"], narration: false },
    { parent: "A soft animal sat by the step. Sam gasped and said…", child: ["A", "@cat!"], narration: false },
    { parent: "They watched the rainy window. Sam said…", child: ["Cat", "on", "mat!"], narration: true },
  ],
  6: [
    { parent: "Sam stamped his foot, then pointed at the little animal and said…", child: ["@Kid!"], narration: false },
    { parent: "Dad opened a small kit. Sam looked inside and said…", child: ["A", "@kit!"], narration: false },
    { parent: "The little animal looked tiny in the rain. Sam said…", child: ["@Kid", "cat!"], narration: false },
    { parent: "Back on the mat, Sam put the kit down and said…", child: ["Cat", "in", "kit!"], narration: true },
  ],
  7: [
    { parent: "The sun went away. Sam stood on his knees and said…", child: ["@Up!"], narration: false },
    { parent: "Dad poured a drink. Sam reached for it and said…", child: ["A", "@cup!"], narration: false },
    { parent: "Sam’s boots sank in brown wet ground. He laughed and said…", child: ["@Mud!"], narration: false },
    { parent: "They waited. Sam lifted his drink and said…", child: ["Cup", "up!"], narration: true },
  ],
  8: [
    { parent: "Heavy rain hit the window. Sam stretched his arms and said…", child: ["@Big!"], narration: false },
    { parent: "Dad held open a soft bag. Sam put things in and said…", child: ["A", "@bag!"], narration: false },
    { parent: "The animal looked huge in the rain. Sam whispered…", child: ["@Big", "cat!"], narration: false },
    { parent: "They sat down. Sam put the bag by the mat and said…", child: ["Bag", "on", "mat!"], narration: true },
  ],
  9: [
    { parent: "The window went misty. Sam wiped a circle and said…", child: ["@Fog!"], narration: false },
    { parent: "Dad turned on a small fan. Sam pointed and said…", child: ["A", "@fan!"], narration: false },
    { parent: "A plump cat sat in the wet. Sam smiled and said…", child: ["@Fat", "cat!"], narration: false },
    { parent: "Rain drummed softly. Sam bounced and said…", child: ["@Fun!"], narration: true },
  ],
  10: [
    { parent: "Rain made the window blurry. Sam touched it and said…", child: ["@Wet!"], narration: false },
    { parent: "Dad held out a bright bag. Sam hugged it and said…", child: ["A", "@red", "bag!"], narration: false },
    { parent: "A damp cat blinked from the mud. Sam knelt and said…", child: ["@Wet", "cat!"], narration: false },
    { parent: "It was quiet inside. Sam put out his hand and said…", child: ["@Pet", "it!"], narration: true },
  ],
  11: [
    { parent: "Rain fell in sheets. Sam waved at it and said…", child: ["@Let", "it!"], narration: false },
    { parent: "Dad put a lid on a pot. Sam tapped it and said…", child: ["A", "@lid!"], narration: false },
    { parent: "The cat walked toward a fallen log. Sam pointed and said…", child: ["A", "@log!"], narration: false },
    { parent: "They rested. The cat had shown the way. Sam said…", child: ["Wet", "cat", "led!"], narration: true },
  ],
  12: [
    { parent: "Rain hit the glass hard. Sam put something on his head and said…", child: ["A", "@hat!"], narration: false },
    { parent: "Dad passed him the bright thing. Sam pulled it down and said…", child: ["@Had", "it!"], narration: false },
    { parent: "The cat slipped behind the log. Sam looked and said…", child: ["@Hid!"], narration: false },
    { parent: "Safe again, Sam fixed his hat and said…", child: ["Hat", "on!"], narration: true },
  ],
  13: [
    { parent: "The rain got quieter. Sam put a finger to his lips and said…", child: ["@Shhh!"], narration: false },
    { parent: "Dad set down a shallow dish. Sam looked in and said…", child: ["A", "@dish!"], narration: false },
    { parent: "A cat face watched from the bushes. Sam whispered…", child: ["A", "@bush!"], narration: false },
    { parent: "They listened. Sam kept his voice soft and said…", child: ["Hat", "on.", "@Shhh!"], narration: true },
  ],
  14: [
    { parent: "Water ran down the window. Sam named the weather and said…", child: ["@Rain!"], narration: false },
    { parent: "Dad pulled a soft rug across the floor. Sam sat on it and said…", child: ["A", "@rug!"], narration: false },
    { parent: "The cat ran through a puddle. Sam ran too and said…", child: ["@Ran!"], narration: false },
    { parent: "They stopped to breathe. Sam said…", child: ["@Rest", "on", "rug!"], narration: true },
  ],
  15: [
    { parent: "A splash made Sam bounce. He shouted…", child: ["@Jump!"], narration: false },
    { parent: "Dad filled a jug. Sam pointed and said…", child: ["A", "@jug!"], narration: false },
    { parent: "The cat did not move at all. Sam noticed and said…", child: ["@Just", "sat!"], narration: false },
    { parent: "Just the two of them now. Sam hugged his knees and said…", child: ["Just", "us!"], narration: true },
  ],
  16: [
    { parent: "It felt cold. Sam pulled on an extra layer and said…", child: ["A", "@vest!"], narration: false },
    { parent: "Dad nodded at the little van outside. Sam packed a bag and said…", child: ["@Van", "bag!"], narration: false },
    { parent: "The cat waited. Sam offered a soft pat and said…", child: ["@Give", "it!"], narration: false },
    { parent: "Nobody moved much. Sam said…", child: ["@Very", "still!"], narration: true },
  ],
  17: [
    { parent: "Lightning flashed far away. Sam answered himself and said…", child: ["@Yes!"], narration: false },
    { parent: "Dad called from the hall. Sam called back…", child: ["@Yell!"], narration: false },
    { parent: "The cat still had not moved. Sam checked and said…", child: ["@Yet!"], narration: false },
    { parent: "He felt sure. Sam nodded and said…", child: ["Yes,", "rest!"], narration: true },
  ],
  18: [
    { parent: "Tap-tap on the glass. Sam said how it felt…", child: ["@Wet!"], narration: false },
    { parent: "Dad wrung out a cloth. Sam took it and said…", child: ["A", "@wet", "rag!"], narration: false },
    { parent: "Puddles shone outside. Sam told Dad…", child: ["@Was", "wet!"], narration: false },
    { parent: "Boots waited by the door. Sam said the plan…", child: ["@Went", "in!"], narration: true },
  ],
  19: [
    { parent: "One thin drip started it all. Sam said…", child: ["@Then!"], narration: false },
    { parent: "Dad held out the red hat. Sam took it and said…", child: ["@This", "hat!"], narration: false },
    { parent: "Across the mud, whiskers moved. Sam pointed and said…", child: ["@That", "cat!"], narration: false },
    { parent: "They were not alone now. Sam said…", child: ["With", "him!"], narration: true },
  ],
  20: [
    { parent: "They needed to hurry. Sam closed his coat and said…", child: ["@Zip!"], narration: false },
    { parent: "Dad offered a bag that closed with a pull. Sam tugged and said…", child: ["A", "@zip", "bag!"], narration: false },
    { parent: "Rain made a busy sound. Sam named it…", child: ["@Buzz!"], narration: false },
    { parent: "Everything was ready. Sam said…", child: ["That", "buzz!"], narration: true },
  ],
  21: [
    { parent: "Before going out, Sam looked at his hat and said…", child: ["@Check!"], narration: false },
    { parent: "Dad set down a fancy mug. Sam looked at it and said…", child: ["@Rich", "mug!"], narration: false },
    { parent: "A bit of wood lay in the mud. Sam picked it up and said…", child: ["A", "@chop!"], narration: false },
    { parent: "The house felt calm. Sam said…", child: ["@Such", "fun!"], narration: true },
  ],
  22: [
    { parent: "There was no time to wait. Sam moved fast and said…", child: ["@Quick!"], narration: false },
    { parent: "Dad shook out a soft quilt. Sam climbed under and said…", child: ["A", "@quilt!"], narration: false },
    { parent: "The cat barely moved. Sam tip-toed closer and said…", child: ["@Quiet", "cat!"], narration: false },
    { parent: "They both stayed still. Sam whispered…", child: ["Such", "quiet!"], narration: true },
  ],
  23: [
    { parent: "Sam’s hat sat crooked. He fixed it and said…", child: ["@Fix", "it!"], narration: false },
    { parent: "Dad brought a strong box. Sam put things in and said…", child: ["A", "@box!"], narration: false },
    { parent: "The cat waited right beside it. Sam said…", child: ["@Next", "to", "it!"], narration: false },
    { parent: "Rain tapped six times. Sam counted and said…", child: ["@Six", "taps!"], narration: true },
  ],
  24: [
    { parent: "Rain made a tune on the gutter. Sam waved his hand like a leader and said…", child: ["@Sang!"], narration: false },
    { parent: "Dad rolled out a rug that went on and on. Sam said…", child: ["A", "@long", "rug!"], narration: false },
    { parent: "The cat stayed back under the leaves. Sam said…", child: ["@Hanging", "back!"], narration: false },
    { parent: "A long quiet filled the room. Sam said…", child: ["@Long", "hush!"], narration: true },
  ],
  25: [
    { parent: "Sam stopped to use his brain, then said…", child: ["@Think!"], narration: false },
    { parent: "Dad passed a rosy cup. Sam held it and said…", child: ["A", "@pink", "mug!"], narration: false },
    { parent: "His boots sank deeper in the mud. Sam said…", child: ["@Sank!"], narration: false },
    { parent: "The cat’s eye glittered. Sam saw it and said…", child: ["A", "@wink!"], narration: true },
  ],
  26: [
    { parent: "Clouds covered the sun. Drip, drip, drip. Sam touched the window and said…", child: ["A", "wet", "@day!"], narration: false },
    { parent: "Under the shelf he found the hat he wore on sunny days. He put it on and said…", child: ["My", "red", "hat", "is", "on!"], narration: false },
    { parent: "A small shape sat in the mud. Two eyes looked up. Sam held out his hand and said…", child: ["@May", "I", "pet", "it?"], narration: false },
    { parent: "He made a tent with a blanket. The cat curled close. Sam shouted…", child: ["We", "can", "@play", "all", "@day!"], narration: false },
  ],
  27: [
    { parent: "Rain tapped the window. Sam looked hard and said…", child: ["@See", "the", "rain!"], narration: false },
    { parent: "He put on his coat and opened the door. The street looked bright. Sam said…", child: ["@Green", "street!"], narration: false },
    { parent: "Rain beads sat on the cat’s ear. Sam counted and said…", child: ["@Three", "drops!"], narration: false },
    { parent: "Inside again, they shared a towel. Sam said…", child: ["We", "@see", "a", "wet", "day!"], narration: false },
  ],
  28: [
    { parent: "Sam climbed on the cushions to watch the rain and said…", child: ["Sit", "@high!"], narration: false },
    { parent: "His red hat sat tall on his head. He opened the door and said…", child: ["@Bright", "hat!"], narration: false },
    { parent: "The cat’s eyes shone in the dark mud. Sam asked…", child: ["@Night", "eyes?"], narration: false },
    { parent: "The rain got softer. Sam said…", child: ["A", "@light", "day!", "I", "can", "@see!"], narration: false },
  ],
  29: [
    { parent: "Wind pushed the rain sideways. Sam held on and said…", child: ["@Blow,", "rain!"], narration: false },
    { parent: "A yellow flower bent in the wet. Sam pointed and said…", child: ["@Yellow", "bow!"], narration: false },
    { parent: "The cat sat near the ground by the step. Sam whispered…", child: ["@Low", "cat!"], narration: false },
    { parent: "They shared a towel. Outside the wind still moved. Sam said…", child: ["Rain", "can", "@blow!", "Bright", "light!"], narration: false },
  ],
  30: [
    { parent: "Drops raced down the glass. Sam laughed and said…", child: ["@Cool", "zoo", "of", "drops!"], narration: false },
    { parent: "He picked up his soft red hat and said…", child: ["@Scoop", "the", "hat!"], narration: false },
    { parent: "A puddle sat by the door. Sam stepped near and said…", child: ["A", "mud", "@pool!"], narration: false },
    { parent: "The cat sat on his lap. Sam whispered…", child: ["Too", "@cool!", "Blow", "low!"], narration: false },
  ],
  31: [
    { parent: "Sam held his favourite story and said…", child: ["A", "good", "@book!"], narration: false },
    { parent: "He took his hat from the wooden hook and said…", child: ["@Hook", "the", "hat!"], narration: false },
    { parent: "Under a bush, the cat watched him. Sam said…", child: ["@Look,", "cat!"], narration: false },
    { parent: "They sat with the story while rain tapped. Sam said…", child: ["Good", "@book", "day!", "Cool", "pool!"], narration: false },
  ],
  32: [
    { parent: "At first Sam sat far from the cold glass. Then he slid closer and said…", child: ["@Far,", "then", "near!"], narration: false },
    { parent: "He put on his hat and scarf and opened the door a little. He said…", child: ["A", "warm", "@scarf!"], narration: false },
    { parent: "The puddle looked dark. Sam held out his hand and said…", child: ["@Dark", "puddle!"], narration: false },
    { parent: "The cat curled into a ball. Sam said…", child: ["A", "soft", "@star!", "Look", "—", "book", "time!"], narration: false },
  ],
  33: [
    { parent: "Sam’s crayons sat on the mat, but he did not want to colour. He said…", child: ["@Sort", "the", "crayons", "later!"], narration: false },
    { parent: "He put on his red hat and stood by the door. He said…", child: ["@For", "luck!"], narration: false },
    { parent: "The cat was wetter than before. Sam knelt and said…", child: ["@More", "wet!"], narration: false },
    { parent: "They sat with toast crumbs and listened. Sam said…", child: ["Tell", "a", "short", "@story!"], narration: false },
  ],
  34: [
    { parent: "The rain looked gentle now. Sam said…", child: ["@Fair", "rain!"], narration: false },
    { parent: "He put his hat on carefully and stepped to the porch. He said…", child: ["With", "@care!"], narration: false },
    { parent: "Two muddy paw prints waited. Sam said…", child: ["A", "@pair", "of", "paws!"], narration: false },
    { parent: "One chair was free. Sam said…", child: ["A", "@chair", "for", "us!", "Short", "story", "time!"], narration: false },
  ],
  35: [
    { parent: "Rain spun across the garden. Sam turned around and said…", child: ["@Twirl!"], narration: false },
    { parent: "His boots were still dry inside. He got up and said…", child: ["@Stir,", "then", "go!"], narration: false },
    { parent: "Leaves made a circle in the mud. Sam stepped in and said…", child: ["A", "@swirl!"], narration: false },
    { parent: "Their small friend settled down ahead of Sam. He said…", child: ["@First", "the", "cat!", "Fair", "chair!"], narration: false },
  ],
  36: [
    { parent: "Wind found the edges of the window. Sam faced it and said…", child: ["@Out", "it", "pours!"], narration: false },
    { parent: "He knew where his hat was. He put it on and said…", child: ["No", "@doubt!"], narration: false },
    { parent: "The cat made a tiny sound. Sam answered…", child: ["A", "loud", "@shout!"], narration: false },
    { parent: "They shook off the drops. Sam said…", child: ["@Round", "and", "safe!", "First", "twirl!"], narration: false },
  ],
  37: [
    { parent: "Sam liked the soft sound of the rain. He felt brave and said…", child: ["A", "brave", "@boy!"], narration: false },
    { parent: "He put on his favourite hat and opened the door. He said…", child: ["My", "@toy", "hat!"], narration: false },
    { parent: "The cat sat in the mud like a little toy. Sam said…", child: ["@Joy!", "a", "cat!"], narration: false },
    { parent: "They made a blanket fort. Sam said…", child: ["What", "a", "@joy!", "Out", "—", "no", "doubt!"], narration: false },
  ],
  38: [
    { parent: "Sam pretended to drink from a cup while the real rain fell. He said…", child: ["@Tea", "time!"], narration: false },
    { parent: "Hat on, he thought of a sandy place far away. He said…", child: ["I", "dream", "of", "the", "@beach!"], narration: false },
    { parent: "A leaf floated on a puddle. Sam said…", child: ["A", "leaf", "@boat!"], narration: false },
    { parent: "They shared a small snack. Sam said…", child: ["A", "real", "@treat!", "Boy", "joy!"], narration: false },
  ],
  39: [
    { parent: "Rain tried to spoil the quiet time. Sam shook his head and said…", child: ["Don’t", "@spoil", "it!"], narration: false },
    { parent: "Hat and coat on, he looked at the shiny ground. He said…", child: ["The", "@soil", "shines!"], narration: false },
    { parent: "He wanted to be kind. He said…", child: ["A", "soft", "@choice!"], narration: false },
    { parent: "They chose the warm mat, away from the draught. Sam said…", child: ["We", "@avoid", "the", "cold!", "Tea", "and", "a", "treat!"], narration: false },
  ],
  40: [
    { parent: "Sam stacked cushions like a cake. He laughed and said…", child: ["Make", "a", "@cake!"], narration: false },
    { parent: "He tightened his hat strap and took a step out. He said…", child: ["A", "@brave", "step!"], narration: false },
    { parent: "It was getting late, but the cat still waited. Sam said…", child: ["A", "@late", "friend!"], narration: false },
    { parent: "They sat in the same quiet place. Sam said…", child: ["Same", "@space,", "and", "safe!", "Don’t", "spoil", "our", "choice!"], narration: false },
  ],
  41: [
    { parent: "Rain drew thin lines on the window. Sam’s face lit up and he said…", child: ["A", "@nice", "@smile!"], narration: false },
    { parent: "He liked rainy days best for his red hat. He said…", child: ["I", "@like", "this", "hat!"], narration: false },
    { parent: "The cat stayed very still. Sam said…", child: ["@Quite", "still!"], narration: false },
    { parent: "The afternoon felt long and soft. Sam said…", child: ["@Time", "to", "rest!", "Brave", "cake", "in", "our", "space!"], narration: false },
  ],
  42: [
    { parent: "Sam joked that someone should call the sun. He said…", child: ["@Hope", "they", "@phone", "home!"], narration: false },
    { parent: "Just Sam and his hat at the door. He said…", child: ["@Alone", "with", "my", "hat!"], narration: false },
    { parent: "A grey stone sat by the cat. Sam said…", child: ["A", "@stone", "so", "@close!"], narration: false },
    { parent: "Inside felt complete again. Sam said…", child: ["@Home", "feels", "whole!", "Nice", "smile.", "Rest", "time!"], narration: false },
  ],
  43: [
    { parent: "Sam had a big plan for the rainy day. He said…", child: ["A", "@huge,", "@cute", "plan!"], narration: false },
    { parent: "His hat made him feel ready. He said…", child: ["My", "hat’s", "the", "@rule!"], narration: false },
    { parent: "It was a damp June day. Sam hummed and said…", child: ["A", "@June", "@tune!"], narration: false },
    { parent: "Nobody needed to rush. Sam said…", child: ["We", "@refuse", "to", "rush!", "Home", "feels", "whole!"], narration: false },
  ],
  44: [
    { parent: "The morning light was grey. Sam stretched and said…", child: ["@Yawn…", "@dawn", "rain!"], narration: false },
    { parent: "He saw his hat and stopped in wonder. He said…", child: ["I", "@saw", "my", "hat!"], narration: false },
    { parent: "The cat sat on the edge of the grass. Sam crawled closer and said…", child: ["On", "the", "@lawn!"], narration: false },
    { parent: "Pages waited beside soft fur. Sam said…", child: ["Paws", "and", "a", "@law", "of", "rest!", "Cute", "huge", "plan!"], narration: false },
  ],
  45: [
    { parent: "Rain or shine, Sam wanted to look after the afternoon. He said…", child: ["@Care", "and", "@share!"], narration: false },
    { parent: "Hat ready. He took a brave step onto the porch and said…", child: ["I", "@dare", "a", "step!"], narration: false },
    { parent: "Puddles shone. Sam looked kindly and said…", child: ["Don’t", "@stare,", "cat!"], narration: false },
    { parent: "They had a quiet hour free. Sam said…", child: ["We", "can", "@spare", "an", "hour!", "Dawn", "on", "the", "lawn!"], narration: false },
  ],
  46: [
    { parent: "The cold tried to sound scary, but Sam was fine. He said…", child: ["No", "real", "@curse!"], narration: false },
    { parent: "He found his hat in a rush and went to the door. He said…", child: ["In", "a", "@hurry!"], narration: false },
    { parent: "A leaf had curled up. The cat waited. Sam said…", child: ["I’ll", "@nurse", "you!"], narration: false },
    { parent: "Fur was drying. Worries were going. Sam said…", child: ["Fur", "is", "@turning", "dry!", "Care", "and", "share!"], narration: false },
  ],
  47: [
    { parent: "Each drop hit the window. Sam liked this view better. He said…", child: ["A", "@better", "view!"], narration: false },
    { parent: "He remembered his hat and went to the porch. He said…", child: ["I", "@remembered", "my", "hat!"], narration: false },
    { parent: "The cat hid among the green plants. Sam said gently…", child: ["Under", "the", "@fern!"], narration: false },
    { parent: "Later he could smell dinner. The rain got softer. Sam said…", child: ["A", "softer", "@letter", "of", "rain!", "I’ll", "nurse", "your", "fur!"], narration: false },
  ],
  48: [
    { parent: "Outside looked wide and muddy. Sam asked…", child: ["@How", "is", "the", "garden", "@now?"], narration: false },
    { parent: "Hat on, he stepped out and said…", child: ["Please", "@allow", "me", "one", "brave", "step!"], narration: false },
    { parent: "A flower bent over. Sam called…", child: ["Come", "@down,", "cat!", "I", "see", "you!"], narration: false },
    { parent: "Back inside, the loud rain felt far away. Sam said…", child: ["@Wow!", "This", "mat", "feels", "safe.", "It", "is", "a", "@better", "spot", "than", "out", "by", "the", "fern!"], narration: false },
  ],
  49: [
    { parent: "They waited. Sam thought of the wet path and said…", child: ["I", "see", "a", "@snail", "on", "the", "trail!"], narration: false },
    { parent: "Hat on again. Cool air. Sam said…", child: ["I", "@claim", "my", "hat", "for", "the", "trip", "out!"], narration: false },
    { parent: "Thin rain fell. Sam wanted to be kind. He said…", child: ["My", "@aim", "is", "to", "be", "kind", "to", "you!"], narration: false },
    { parent: "They stayed close. Sam said…", child: ["We", "@remain", "close", "on", "the", "mat.", "@How", "nice", "and", "warm", "it", "feels", "@now!"], narration: false },
  ],
  50: [
    { parent: "Water ran by the road. Sam smiled and said…", child: ["Maybe", "a", "@goat", "could", "ride", "in", "a", "@boat!"], narration: false },
    { parent: "Towel and hat ready. He went to the porch and said…", child: ["Please", "@load", "the", "towel", "by", "the", "door!"], narration: false },
    { parent: "A damp leaf lay near the cat. Sam said…", child: ["Look", "by", "the", "@oak", "—", "a", "wet", "leaf!"], narration: false },
    { parent: "Coats off. Sam said…", child: ["@Cocoa", "can", "come", "later.", "We", "@remain", "close,", "slow", "as", "a", "@snail!"], narration: false },
  ],
  51: [
    { parent: "Stay in or go out? Sam thought and said…", child: ["Shall", "we", "@chew", "on", "the", "plan,", "or", "@stew", "indoors?"], narration: false },
    { parent: "The red hat waited for him. He opened the door and said…", child: ["I", "@knew", "my", "hat", "was", "ready", "for", "this!"], narration: false },
    { parent: "Leaves sat in the puddle. Sam said…", child: ["What", "a", "messy", "puddle", "@stew", "of", "leaves!"], narration: false },
    { parent: "The room went still. Sam said…", child: ["We", "@grew", "quiet", "together", "on", "the", "mat.", "Maybe", "we", "can", "have", "cocoa", "by", "the", "@oak", "later!"], narration: false },
  ],
  52: [
    { parent: "Lamps along the street glowed warm. Sam said…", child: ["The", "lights", "look", "like", "a", "tiny", "@fire!"], narration: false },
    { parent: "He put on his hat and stepped out. He said…", child: ["This", "hat", "is", "@required", "in", "the", "cold!"], narration: false },
    { parent: "The cat looked tired. Sam said…", child: ["You", "look", "tired", "in", "the", "@mire,", "little", "cat!"], narration: false },
    { parent: "Back on the mat. Sam said…", child: ["We", "can", "@retire", "to", "rest", "now.", "No", "more", "standing", "in", "that", "puddle", "@stew!"], narration: false },
  ],
  53: [
    { parent: "Sam listened at the window. He said…", child: ["I", "can", "@hear", "every", "drop.", "The", "weather", "is", "loud", "today!"], narration: false },
    { parent: "Hat on, he grinned. He said…", child: ["I", "have", "no", "@fear", "with", "my", "hat", "on.", "I", "am", "ready", "for", "the", "door!"], narration: false },
    { parent: "The small cat looked worn out. Sam said…", child: ["Come", "@near,", "dear", "cat.", "I", "will", "help", "you", "right", "away!"], narration: false },
    { parent: "Inside felt kind and calm. Sam said…", child: ["I", "@hear", "you,", "and", "I", "will", "help.", "Let’s", "@retire", "from", "the", "@mire", "and", "get", "warm!"], narration: false },
  ],
  54: [
    { parent: "Sam trusted the weather would clear. He said…", child: ["I", "feel", "@sure", "the", "clouds", "will", "pass.", "Soon", "the", "sky", "will", "look", "@pure", "and", "blue!"], narration: true },
    { parent: "Hat fixed. He stepped out. He said…", child: ["My", "hat", "is", "@secured", "nice", "and", "tight.", "One", "splashy", "step,", "then", "another", "into", "the", "wet!"], narration: true },
    { parent: "The cat looked hopeful. Sam said…", child: ["Here", "is", "my", "gentle", "@cure", "for", "you:", "come", "inside", "where", "it", "is", "dry!"], narration: true },
    { parent: "The room felt warm. Sam said…", child: ["Warmth", "feels", "@pure", "in", "here.", "@Hear", "me:", "you", "do", "not", "need", "to", "@fear.", "Come", "@near", "and", "rest", "on", "the", "mat!"], narration: true },
  ],
  55: [
    { parent: "Lines of rain crossed the window. Sam said…", child: ["I", "can", "hear", "the", "long", "rain", "on", "the", "glass.", "I", "will", "sit", "still", "and", "listen", "to", "each", "drop.", "What", "a", "soft", "song", "for", "a", "wet", "day!"], narration: true },
    { parent: "On the porch, hat on, Sam said…", child: ["My", "hat", "is", "on", "for", "this", "trip", "outside.", "The", "path", "shines,", "and", "I", "feel", "sure", "on", "my", "feet.", "I", "can", "take", "the", "next", "step", "into", "the", "wet!"], narration: true },
    { parent: "The tired cat waited. Sam said…", child: ["Come", "near,", "tired", "friend.", "You", "do", "not", "need", "to", "fear", "me.", "Your", "day", "can", "continue", "indoors", "with", "me", "on", "the", "mat!"], narration: true },
    { parent: "Cocoa and a book were ready. Sam said…", child: ["Here", "is", "sure", "warmth", "and", "pure", "rest.", "We", "can", "share", "this", "book", "and", "retire", "from", "the", "storm.", "The", "rain", "may", "keep", "drumming,", "but", "we", "stay", "safe", "together!"], narration: true },
  ],
  56: [
    { parent: "Sam began…", child: ["The", "garden", "looks", "silver", "in", "the", "rain", "today.", "I", "watch", "the", "drops", "on", "every", "leaf.", "I", "do", "not", "need", "to", "hurry.", "I", "can", "just", "listen", "to", "the", "weather!"], narration: true },
    { parent: "At the door…", child: ["I", "step", "out,", "brave", "and", "ready.", "My", "red", "hat", "keeps", "me", "bold", "in", "the", "cold", "air.", "My", "boots", "shine,", "and", "the", "porch", "is", "dark", "with", "rain.", "This", "feels", "like", "the", "start", "of", "an", "adventure!"], narration: true },
    { parent: "To the cat…", child: ["Dear", "cat,", "you", "can", "come", "indoors", "now!", "You", "have", "mud", "on", "your", "fur,", "but", "you", "still", "look", "brave.", "I", "will", "kneel", "and", "talk", "softly.", "I", "promise", "you", "warmth,", "and", "you", "do", "not", "need", "to", "fear!"], narration: true },
    { parent: "Safe inside…", child: ["We", "share", "the", "ending:", "warmth,", "pages,", "and", "peace.", "The", "blanket", "keeps", "us", "snug", "while", "the", "storm", "finishes", "outside.", "I", "can", "read", "any", "story", "I", "choose", "now.", "This", "one", "ends", "with", "us,", "safe", "together!"], narration: true },
  ],
}

if (Object.keys(DRAFTS).length !== TOTAL_LEVELS) {
  throw new Error(`Expected ${TOTAL_LEVELS} levels, got ${Object.keys(DRAFTS).length}`)
}

export const rainDayLevels: StoryLevel[] = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
  const level = i + 1
  return buildLevel(level, DRAFTS[level]!)
})
