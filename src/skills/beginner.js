const kneel = { t: 0, arm: [90, 90], leg: [95, 175], leg2: [95, 175] }
const hang = { t: -100, arm: [-82, -82], leg: [90, 90], anchor: 'bar' }
const activeHang = { t: -100, arm: [-82, -82], armLen: [0.9, 0.9], leg: [90, 90], anchor: 'bar' }
const wallHandstand = { t: 90, arm: [90, 90], leg: [-88, -88], foot: -90, wall: true }
const plank = { t: -8, arm: [90, 0], leg: [165, 168] }
const squatHold = { t: 0, arm: [90, 90], leg: [30, 115] }
const frog = { t: 30, arm: [90, 90], leg: [40, 205], foot: 180 }
// Archer push-up seen from above: wide hands, then the chest shifts over one bent arm while the other stays straight.
const archerBase = { kind: 'top', sw: 22, hw: 12, sy: 30, hy: 62, headY: 19, feet: [[60, 90], [70, 90]] }
const archerA = { ...archerBase, arms: [{ h: [14, 30] }, { h: [116, 30] }] }
const archerB = { ...archerBase, shift: -14, arms: [{ e: [30, 42], h: [18, 30] }, { h: [116, 30] }] }
const pistolDown = { t: -50, arm: [0, 0], leg: [0, 100], leg2: [0, 0] }
const pistolUp = { t: -90, arm: [0, 0], leg: [90, 90], leg2: [0, 0] }
const german = { t: -95, arm: [-35, -35], leg: [100, 100], anchor: 'bar' }

export default [
  {
    id: 'wall-handstand-hold',
    name: 'Wall Handstand Hold',
    blurb: 'Stack your body upside down on a wall',
    muscles: 'shoulders, core, wrists',
    steps: [
      { title: 'Wrist warm-up', text: 'Kneel with palms flat and fingers spread. Rock gently forward and back, then circle your wrists.', tip: 'Keep your fingers spread and pressing into the floor.', pose: kneel, timer: 20 },
      { title: 'Plank shoulder shrugs', text: 'In a plank, push the floor away so your upper back rounds up, then let your chest sink between your shoulders.', tip: 'Arms stay locked straight, only the shoulder blades move.', pose: plank, reps: 8 },
      { title: 'Walk up the wall', text: 'Start in a plank with your feet at the wall. Walk your feet up the wall and your hands closer to it.', tip: 'Stop at the height where you feel steady; do not rush.', pose: { ...plank, wall: true }, pose2: { t: 30, arm: [90, 90], leg: [-155, -155], foot: -160, wall: true } },
      { title: 'Hold the line', text: 'Push the floor away and squeeze your glutes. Keep your ribs in so your body is one straight line from hands to toes.', tip: 'Do not arch your lower back into a banana shape.', pose: wallHandstand, timer: 20 },
      { title: 'Kick up from lunge', text: 'Place your hands 20 cm from the wall and swing your strong leg up, then the other, until your heels touch the wall.', tip: 'Bail out by cartwheeling one leg to the side.', pose: { t: 45, arm: [90, 90], leg: [-125, -125], foot: -125, leg2: [60, 120], wall: true }, pose2: wallHandstand },
      { title: 'Progress', text: 'Build to 60 seconds against the wall. Then practise taking one foot off the wall at a time.', pose: wallHandstand },
    ],
  },
  {
    id: 'frog-stand',
    name: 'Frog Stand',
    blurb: 'First arm balance on your hands',
    muscles: 'wrists, shoulders, core',
    steps: [
      { title: 'Wrist prep', text: 'Kneel with palms flat and fingers spread. Lean your weight forward over your hands and rock back gently.', pose: kneel, timer: 20 },
      { title: 'Deep squat', text: 'Squat with your feet wide and place your hands on the floor in front of you. Press your knees against your elbows.', tip: 'Spread your fingers and keep your elbows bent and pointing back.', pose: squatHold, timer: 15 },
      { title: 'Knees on triceps', text: 'Lean forward until your knees rest on the backs of your upper arms. Keep your toes on the floor and look ahead.', tip: 'Look a hand-width in front of your hands, not down at them.', pose: { t: 30, arm: [90, 90], leg: [40, 200], foot: 90 }, timer: 15 },
      { title: 'Lift both feet', text: 'Shift your weight forward and lift one foot, then the other. Hold with both feet off the floor.', tip: 'Think of tipping forward, not jumping.', pose: frog, timer: 15 },
      { title: 'Progress', text: 'Once you can hold 20 seconds, work on straightening your arms and moving into a crow.', pose: frog },
    ],
  },
  {
    id: 'crow-pose',
    name: 'Crow Pose',
    blurb: 'Balance with your knees on your arms',
    muscles: 'wrists, core, shoulders',
    steps: [
      { title: 'Wrist warm-up', text: 'Kneel with palms flat and fingers spread. Lean forward over your hands, then back.', pose: kneel, timer: 20 },
      { title: 'Squat and set hands', text: 'Squat with your knees wide and place your palms shoulder-width apart. Your hips stay low and your elbows bend back.', pose: squatHold, timer: 15 },
      { title: 'Lean and lift', text: 'Lean your weight forward until your toes get light. Lift one foot and then the other off the floor.', tip: 'Gaze forward. If you look down, you fall.', pose: squatHold, pose2: { t: 30, arm: [80, 90], leg: [40, 205], foot: 180 } },
      { title: 'Hold the crow', text: 'Squeeze your knees into your upper arms, round your upper back, and hold with feet together.', tip: 'Bent arms is a good start; straight arms is the full crow.', pose: { t: 30, arm: [80, 90], leg: [40, 205], foot: 180 }, timer: 15 },
      { title: 'Progress', text: 'Straighten your arms a little at a time. Then try lifting your hips higher.', pose: { t: 40, arm: [90, 90], leg: [45, 200], foot: 180 } },
    ],
  },
  {
    id: 'l-sit',
    name: 'L-Sit (tucked → full)',
    blurb: 'Hold your legs out in front of you',
    muscles: 'core, hip flexors, triceps',
    steps: [
      { title: 'Seated set-up', text: 'Sit with your legs straight and place your hands beside your hips, fingers forward. Push the floor away and sit tall.', pose: { t: -90, arm: [90, 90], leg: [0, 0] }, timer: 15 },
      { title: 'Tucked hold', text: 'Press into your hands to lift your hips off the floor. Pull your knees toward your chest and hold.', tip: 'Depress your shoulders so you do not shrug up to your ears.', pose: { t: -90, arm: [90, 90], leg: [-30, 80], foot: 0 }, timer: 15 },
      { title: 'One leg extended', text: 'From the tuck, extend one leg straight and hold, then switch legs.', tip: 'Keep your toes pointed and quads tight.', pose: { t: -90, arm: [90, 90], leg: [0, 0], leg2: [-30, 80] }, timer: 15 },
      { title: 'Full L-sit', text: 'Extend both legs straight in front, level with your hips. Lock your elbows and keep your chest up.', tip: 'Never bend your knees to hold longer.', pose: { t: -90, arm: [90, 90], leg: [0, 0], foot: -45 }, timer: 10 },
      { title: 'Progress', text: 'Raise your hold time to 20 seconds, then lift your legs a little above horizontal.', pose: { t: -90, arm: [90, 90], leg: [-8, -8] } },
    ],
  },
  {
    id: 'hollow-body-hold',
    name: 'Hollow Body Hold',
    blurb: 'The base position of all gymnastics',
    muscles: 'abs, hip flexors',
    steps: [
      { title: 'Flat back', text: 'Lie on your back with knees bent and press your lower back into the floor. Keep it glued there.', tip: 'If your back lifts off the floor, stop and reset.', pose: { t: 180, arm: [180, 180], leg: [-50, 70] }, timer: 15 },
      { title: 'Tucked hollow', text: 'Lift your shoulders and bring your knees up to 90 degrees. Reach your arms alongside your thighs.', pose: { t: -160, arm: [-20, -20], leg: [-70, 20] }, timer: 15 },
      { title: 'Extend the legs', text: 'Straighten your legs a little at a time, only as far as your lower back stays on the floor.', pose: { t: -160, arm: [-20, -20], leg: [-35, -20] }, timer: 15 },
      { title: 'Full hollow', text: 'Reach your arms overhead and legs straight, low to the floor. Make your body one shallow banana shape.', tip: 'Tuck your ribs and chin; legs lower only if your back stays flat.', pose: { t: -160, arm: [-165, -165], leg: [-20, -20] }, timer: 20 },
      { title: 'Progress', text: 'Build to 45 seconds, then rock back and forth without losing the shape.', pose: { t: -160, arm: [-165, -165], leg: [-20, -20] } },
    ],
  },
  {
    id: 'archer-push-up',
    name: 'Archer Push-up',
    blurb: 'One-arm push-up lead-in',
    muscles: 'chest, triceps, shoulders',
    steps: [
      { title: 'Wide plank', text: 'Get in a plank with your hands about twice shoulder-width apart. Keep your body straight.', pose: archerA, timer: 15 },
      { title: 'Wide push-up', text: 'Do push-ups with your wide hand position. Lower your chest between your hands.', tip: 'Keep your elbows at 45 degrees, not flared out.', pose: archerA, reps: 8 },
      { title: 'Shift to one side', text: 'Lower your body over one hand while the other arm stays straight and reaches out to the side.', tip: 'The straight arm is only a support.', pose: archerA, pose2: archerB },
      { title: 'Alternate sides', text: 'Push back up and repeat to the other side. Move your body, not your hands.', pose: archerB, reps: 6 },
      { title: 'Progress', text: 'Widen your hands and rest less on the straight arm, working toward a one-arm push-up.', pose: archerB },
    ],
  },
  {
    id: 'pistol-squat',
    name: 'Pistol Squat',
    blurb: 'One-legged squat to the floor',
    muscles: 'quads, glutes, balance',
    steps: [
      { title: 'Deep squat hold', text: 'Squat down with feet shoulder-width and heels flat. Hold the bottom with your chest up.', tip: 'Elevate your heels on a plate if they lift.', pose: { t: -60, arm: [0, 0], leg: [0, 100] }, timer: 20 },
      { title: 'Assisted pistol', text: 'Hold a door frame or post with one hand. Lower on one leg with the other leg extended forward.', tip: 'Use your hand only for balance.', pose: pistolDown, reps: 5 },
      { title: 'Slow negatives', text: 'Stand on one leg with your arms forward. Lower yourself slowly for 3 seconds to the bottom.', tip: 'Keep your heel down and knee tracking over your toes.', pose: pistolUp, pose2: pistolDown, reps: 5 },
      { title: 'Full pistol', text: 'Lower to the bottom on one leg with the other leg straight in front, then stand up. Keep your arms forward for balance.', tip: 'Drive through your whole foot and do not bounce.', pose: pistolDown, reps: 3 },
      { title: 'Progress', text: 'Work toward 5 clean reps per leg. Then try without arms forward.', pose: pistolUp },
    ],
  },
  {
    id: 'dead-hang-to-scap-pull-up',
    name: 'Dead Hang to Scap Pull-up',
    blurb: 'The first step toward your pull-up',
    muscles: 'lats, grip, shoulders',
    steps: [
      { title: 'Dead hang', text: 'Hang from the bar with straight arms and a firm grip. Let your shoulders relax up toward your ears.', tip: 'Wrap your thumbs around the bar.', pose: hang, timer: 20 },
      { title: 'Active hang', text: 'Without bending your elbows, pull your shoulders down and away from your ears. Your chest rises slightly.', tip: 'Your arms stay locked straight.', pose: activeHang, timer: 15 },
      { title: 'Scap pull-ups', text: 'From a dead hang, pull your shoulders down to rise a few centimeters. Lower slowly back to a dead hang.', pose: hang, pose2: activeHang, reps: 8 },
      { title: 'Add a bend', text: 'After the scap pull, bend your elbows to pull your chin toward the bar, then lower slowly.', tip: 'Control the descent for at least 3 seconds.', pose: hang, pose2: { t: -100, arm: [115, -60], leg: [90, 100], anchor: 'bar' }, reps: 3 },
      { title: 'Progress', text: 'Build to 10 scap pull-ups and a 30 second hang, then try negative pull-ups.', pose: hang },
    ],
  },
  {
    id: 'pseudo-planche-push-up',
    name: 'Pseudo Planche Push-up',
    blurb: 'Lean forward to load your shoulders',
    muscles: 'shoulders, chest, core',
    steps: [
      { title: 'Wrist prep', text: 'Kneel with palms flat and fingers pointing back at your knees. Rock gently over them.', pose: kneel, timer: 20 },
      { title: 'Lean forward', text: 'In a plank, turn your fingers slightly outward and shift your shoulders ahead of your hands.', tip: 'Keep arms straight and push the floor away.', pose: { t: -20, arm: [105, 105], leg: [155, 158] }, timer: 15 },
      { title: 'Hollow body', text: 'Round your upper back and tuck your pelvis so you keep a hollow line while leaning.', tip: 'Do not let your hips drift upward.', pose: { t: -25, arm: [105, 105], leg: [152, 157] }, timer: 15 },
      { title: 'Pseudo push-up', text: 'Lower your chest to the floor, keeping your elbows close to your sides. Press back up.', tip: 'Shoulders stay over or ahead of your hands.', pose: { t: -25, arm: [105, 105], leg: [152, 157] }, pose2: { t: -12, arm: [130, 20], leg: [160, 164] }, reps: 6 },
      { title: 'Progress', text: 'Lean farther forward and shorten the set until you can do 10 solid reps.', pose: { t: -30, arm: [110, 110], leg: [150, 155] } },
    ],
  },
  {
    id: 'skin-the-cat-intro',
    name: 'Skin the Cat (intro)',
    blurb: 'Rotate through your shoulders on a bar',
    muscles: 'shoulders, lats, core',
    steps: [
      { title: 'Active hang', text: 'Hang from the bar with a firm grip and active shoulders. Keep your hands shoulder-width apart.', pose: activeHang, timer: 15 },
      { title: 'Tuck up', text: 'Pull your knees up to your chest so your hips rise toward the bar. Keep your arms straight.', tip: 'Stay tucked tight to avoid swinging.', pose: { t: -100, arm: [-82, -82], leg: [-30, 90], anchor: 'bar' }, timer: 10 },
      { title: 'Rotate back', text: 'Roll your hips up and over so your feet pass between your arms. Lower your legs slowly behind you.', tip: 'Go slowly, only as far as is comfortable on your shoulders.', pose: { t: -100, arm: [-82, -82], leg: [-30, 90], anchor: 'bar' }, pose2: german },
      { title: 'German hang', text: 'Hang with your back to the floor and your arms stretched behind. Breathe and relax into the stretch.', tip: 'Drop to your feet if your shoulders feel pinched.', pose: german, timer: 10 },
      { title: 'Roll back out', text: 'Tuck your knees, then reverse the movement until your feet come back through the arms to hang.', pose: german, pose2: hang },
    ],
  },
]
