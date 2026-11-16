const hs = { t: 90, arm: [90, 90], leg: [-90, -90], foot: -90 }
const hang = { t: -100, arm: [-82, -82], leg: [90, 90], anchor: 'bar' }
const pullTop = { t: -100, arm: [115, -60], leg: [90, 100], anchor: 'bar' }
const support = { t: -85, arm: [90, 90], leg: [90, 165], anchor: 'hands', bar: true }
const overBar = { t: -80, arm: [120, -35], leg: [90, 165], anchor: 'hands', bar: true }
const flagBench = { anchor: 'hands', bench: true }
const wideHang = { view: 'front', arm: [-45, -45], leg: [90, 90], anchor: 'bar' }
const wideTop = { view: 'front', arm: [30, -65], leg: [90, 90], anchor: 'bar' }
const archerTop = { view: 'front', arm: [50, -80], arm2: [-172, -172], leg: [90, 90], anchor: 'bar', headDx: 6 }
const shrimpUp = { t: -90, arm: [90, 90], arm2: [107, 107], leg: [90, 90], leg2: [85, 235], foot2: 235 }
const shrimpDown = { t: -50, arm: [0, 0], arm2: [150, 190], leg: [0, 100], leg2: [95, 185], foot2: -135 }
const flagPole = { posts: true, lift: 25 }
const planchePush = { t: -3, arm: [120, 45], leg: [180, 180], foot: 180 }

export default [
  {
    id: 'freestanding-handstand',
    name: 'Freestanding Handstand',
    blurb: 'Balance upside down with no wall',
    muscles: 'shoulders, core, wrists',
    steps: [
      { title: 'Wrist and shoulder prep', text: 'Kneel with palms down and fingers spread, then rock forward and back over your wrists for 30 seconds.', tip: 'Keep your palms flat and press through every fingertip.', pose: { t: 0, arm: [90, 90], leg: [95, 175], leg2: [95, 175] }, timer: 30 },
      { title: 'Chest-to-wall hold', text: 'Kick up facing the wall with hands 15 cm away. Push the floor away, squeeze your glutes and keep ribs tucked.', tip: 'Do not arch: ribs down, body one straight line.', pose: { ...hs, wall: true }, timer: 20 },
      { title: 'Kick-up practice', text: 'Place hands shoulder-width apart, step one leg forward and kick the back leg up with a straight lead leg. Bring the other leg to meet it.', tip: 'Kick just hard enough to reach vertical.', pose: { t: 55, arm: [90, 90], leg: [-50, -75], leg2: [-110, -110], foot: -90 }, pose2: hs, reps: 8 },
      { title: 'Balance with fingers', text: 'Kick up away from the wall. If you fall forward, press your fingertips into the floor; if you fall back, push the heels of your hands down.', tip: 'Fingers brake the forward fall, palms stop the backward one.', pose: hs, timer: 10 },
      { title: 'Freestanding hold', text: 'Hold with arms locked, shoulders pushed up toward your ears, legs squeezed together and toes pointed.', tip: 'Look between your hands.', pose: hs, timer: 20 },
      { title: 'Bail out safely', text: 'If you overbalance, step one hand away and rotate into a cartwheel to land on your feet. Practice this exit first.', pose: hs, pose2: { t: 50, arm: [90, 90], leg: [-30, -30], leg2: [-10, -10], foot: -30 } },
    ],
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand Push-up',
    blurb: 'Press your bodyweight overhead',
    muscles: 'shoulders, triceps, upper chest',
    steps: [
      { title: 'Pike push-ups', text: 'From a high pike with hips over your hands, bend your elbows to lower your head toward the floor, then press back up.', tip: 'Elbows at about 45 degrees, not flared wide.', pose: { t: 60, arm: [90, 90], leg: [120, 125] }, pose2: { t: 70, arm: [120, 40], leg: [120, 125] }, reps: 8 },
      { title: 'Elevated pike', text: 'Put your feet on a box so your hips stack higher over your hands. Lower your head to a folded mat and press up.', tip: 'The steeper your torso, the harder it gets.', pose: { t: 65, arm: [90, 90], leg: [105, 110], boxUnder: true }, pose2: { t: 75, arm: [120, 40], leg: [105, 110], boxUnder: true }, reps: 6 },
      { title: 'Wall handstand hold', text: 'Kick up facing the wall and hold with locked elbows and your belly toward the wall.', pose: { ...hs, wall: true }, timer: 20 },
      { title: 'Wall negatives', text: 'From the wall handstand, lower slowly by bending your elbows until your head touches a mat. Take at least 3 seconds.', tip: 'Keep your core tight so your hips do not drift away from the wall.', pose: { ...hs, wall: true }, pose2: { t: 90, arm: [120, 60], leg: [-90, -90], foot: -90, wall: true }, reps: 5 },
      { title: 'Wall handstand push-up', text: 'Lower until your head touches the mat, then press back to full lockout.', tip: 'Press the floor away through your whole hand.', pose: { t: 90, arm: [120, 60], leg: [-90, -90], foot: -90, wall: true }, pose2: { ...hs, wall: true }, reps: 5 },
      { title: 'Progress to freestanding', text: 'When wall reps are easy, add a deficit with parallettes or move to freestanding. Always keep a bail-out plan.', pose: hs },
    ],
  },
  {
    id: 'tuck-front-lever',
    name: 'Tuck Front Lever',
    blurb: 'Hold your body horizontal, face up',
    muscles: 'lats, core, shoulders',
    steps: [
      { title: 'Active hang', text: 'Hang from the bar and pull your shoulders down away from your ears with straight arms.', tip: 'Do not bend your elbows.', pose: hang, timer: 20 },
      { title: 'Hanging tuck raise', text: 'From an active hang, pull your knees up to your chest while keeping your arms straight.', pose: hang, pose2: { t: -100, arm: [-82, -82], leg: [-30, 120], anchor: 'bar' }, reps: 8 },
      { title: 'Tuck hang hold', text: 'Hold your knees tight to your chest with a rounded back and straight arms. Keep your shoulders pulled down.', tip: 'Do not swing; stay still.', pose: { t: -115, arm: [-82, -82], leg: [-40, 120], anchor: 'bar' }, timer: 10 },
      { title: 'Tuck lever position', text: 'From the tuck hang, roll your hips up and lower your back toward horizontal while pulling the bar down toward your hips. Keep your arms straight.', tip: 'Press down on the bar, back flat and parallel to the floor.', pose: { t: 0, arm: [-90, -90], leg: [-50, 150], anchor: 'bar' }, timer: 10 },
      { title: 'Advanced tuck', text: 'Open your hips and push your knees slightly away from your chest while holding your back flat.', tip: 'Keep hips level with shoulders.', pose: { t: -3, arm: [-90, -90], leg: [-25, 90], anchor: 'bar' }, timer: 8 },
      { title: 'Progress', text: 'Extend one leg at a time, then straddle, then both legs for the full front lever.', pose: { t: 0, arm: [-90, -90], leg: [180, 180], foot: 180, anchor: 'bar' } },
    ],
  },
  {
    id: 'tuck-back-lever',
    name: 'Tuck Back Lever',
    blurb: 'Hold horizontal, face down',
    muscles: 'shoulders, biceps, back',
    steps: [
      { title: 'Shoulder and bicep prep', text: 'Hang with a loose grip and let your shoulders open gently behind the bar.', tip: 'Warm up your elbows and biceps before you start.', pose: hang, timer: 20 },
      { title: 'Skin the cat', text: 'From a tuck hang, rotate backward through the bar until your shoulders are fully extended behind you, then return.', tip: 'Go slowly and never force the end range.', pose: { t: -115, arm: [-82, -82], leg: [-40, 120], anchor: 'bar' }, pose2: { t: 20, arm: [-90, -90], leg: [45, -140], anchor: 'bar' }, reps: 5 },
      { title: 'German hang hold', text: 'Hold the bottom of the skin the cat with a tucked body and relaxed shoulders.', pose: { t: 20, arm: [-90, -90], leg: [45, -140], anchor: 'bar' }, timer: 10 },
      { title: 'Tuck back lever', text: 'Lift your hips to shoulder height with a tucked body and straight arms, face down.', tip: 'Keep your back flat and your hips level with your shoulders.', pose: { t: 0, arm: [-90, -90], leg: [40, -140], anchor: 'bar' }, timer: 10 },
      { title: 'Advanced tuck', text: 'Extend your hips so your thighs line up with your torso while your knees stay bent.', pose: { t: 0, arm: [-90, -90], leg: [15, 120], anchor: 'bar' }, timer: 8 },
      { title: 'Progress', text: 'Extend one leg, then both, to reach the full back lever.', pose: { t: 0, arm: [-90, -90], leg: [180, 180], foot: 180, anchor: 'bar' } },
    ],
  },
  {
    id: 'muscle-up-bar',
    name: 'Muscle-up (bar)',
    blurb: 'Pull over the bar into a dip',
    muscles: 'lats, chest, triceps',
    steps: [
      { title: 'Chest-to-bar pull-ups', text: 'Pull up explosively until your chest touches the bar. Aim for 8 clean reps first.', tip: 'Pull the bar toward your lower ribs, not your chin.', pose: hang, pose2: pullTop, reps: 8 },
      { title: 'False grip', text: 'Place the bar low in the heel of your palm with your wrists over the bar. Hang for a few seconds.', tip: 'This keeps your wrists on top when you transition.', pose: hang, timer: 15 },
      { title: 'Explosive pull', text: 'Hang, then pull as fast as possible, leaning back slightly so the bar reaches your belly.', pose: hang, pose2: { t: -115, arm: [115, -50], leg: [100, 115], anchor: 'bar' }, reps: 5 },
      { title: 'Transition', text: 'At the top, lean your chest forward over the bar and whip your elbows around so they point back.', tip: 'Think of pulling yourself around the bar, not up and over.', pose: { t: -115, arm: [115, -50], leg: [100, 115], anchor: 'bar' }, pose2: overBar },
      { title: 'Straight bar dip', text: 'From the chest-over-bar position, press until your arms are locked above the bar.', pose: overBar, pose2: support, reps: 5 },
      { title: 'Full muscle-up', text: 'Link pull, transition and press in one smooth motion. Lower slowly with control.', pose: hang, pose2: support, reps: 3 },
    ],
  },
  {
    id: 'dragon-flag',
    name: 'Dragon Flag',
    blurb: 'Lower a stiff body from the shoulders',
    muscles: 'core, hip flexors, lats',
    steps: [
      { title: 'Hollow hold', text: 'Lie on your back, press your lower back down, lift your legs and shoulders and hold with straight arms.', tip: 'Ribs down, no arch.', pose: { t: -160, arm: [-165, -165], leg: [-20, -20] }, timer: 20 },
      { title: 'Set up on bench', text: 'Lie on a bench with your shoulders at the end. Grip the bench behind your head and lift your legs vertical.', tip: 'Only your upper back and shoulders touch the bench.', pose: { t: 180, arm: [180, 180], leg: [-90, -90], foot: -90, ...flagBench }, timer: 10 },
      { title: 'Tuck dragon flag', text: 'Tuck your knees and lower your hips and legs toward horizontal in a controlled way while your body stays stiff.', tip: 'Never bend at the hips and keep your glutes tight.', pose: { t: 180, arm: [180, 180], leg: [-90, -90], foot: -90, ...flagBench }, pose2: { t: 180, arm: [180, 180], leg: [-70, 150], ...flagBench }, reps: 6 },
      { title: 'Negative flags', text: 'From vertical, lower your straight body slowly over 5 seconds, as far as you can stay straight.', tip: 'Stop before your hips fold.', pose: { t: 180, arm: [180, 180], leg: [-90, -90], foot: -90, ...flagBench }, pose2: { t: 150, arm: [150, 150], leg: [-30, -30], foot: -30, ...flagBench }, reps: 5 },
      { title: 'Full dragon flag', text: 'Lower to a straight horizontal body, hold briefly, then raise back up without sagging.', pose: { t: 180, arm: [180, 180], leg: [0, 0], foot: 0, ...flagBench }, timer: 5 },
    ],
  },
  {
    id: 'tuck-planche',
    name: 'Tuck Planche',
    blurb: 'Hold yourself off the floor on hands',
    muscles: 'shoulders, chest, core, wrists',
    steps: [
      { title: 'Wrist prep', text: 'Kneel with fingers pointing back and forward in turn and rock gently over your wrists.', tip: 'Warm up your wrists for at least a minute.', pose: { t: 0, arm: [90, 90], leg: [95, 175], leg2: [95, 175] }, timer: 30 },
      { title: 'Planche lean', text: 'Get in a plank, push your shoulders forward past your hands with straight arms and hold. Round your upper back.', tip: 'Protract hard and lock your elbows.', pose: { t: -25, arm: [105, 105], leg: [150, 155] }, timer: 15 },
      { title: 'Frog stand', text: 'Squat down, place your knees on the backs of your upper arms, lean forward and lift your feet.', tip: 'Look slightly ahead, not straight down.', pose: { t: -20, arm: [120, 70], leg: [-10, 130] }, timer: 15 },
      { title: 'Tuck planche', text: 'Straighten your arms with your hips level with your shoulders, knees tucked tight and your back rounded.', tip: 'Lean forward until your feet leave the floor.', pose: { t: -5, arm: [100, 100], leg: [-10, 150] }, timer: 10 },
      { title: 'Progress', text: 'Flatten your back and open your hips into advanced tuck, then extend one leg at a time.', pose: { t: -5, arm: [100, 100], leg: [-5, 110] }, timer: 8 },
    ],
  },
  {
    id: 'tuck-human-flag',
    name: 'Tuck Human Flag',
    blurb: 'Hold sideways on a vertical pole',
    muscles: 'obliques, lats, shoulders',
    steps: [
      { title: 'Side plank', text: 'Hold a strong side plank with your hips high and body straight to build your side core.', pose: { t: -12, arm: [90, 0], arm2: [-90, -90], leg: [170, 172] }, timer: 20 },
      { title: 'Vertical hang', text: 'Grip the pole with the top hand palm away, bottom hand palm toward you, and hang with straight arms.', tip: 'Pull with the top arm and push with the bottom.', pose: { t: -90, arm: [-100, -90], arm2: [-90, -90], leg: [90, 90] }, timer: 10 },
      { title: 'Side raise', text: 'Pull and push to lift both knees up toward the pole and lean your body sideways.', pose: { t: -90, arm: [-100, -90], leg: [90, 90] }, pose2: { t: 180, arm: [-125, -125], arm2: [180, 180], leg: [-60, 130], ...flagPole }, reps: 6 },
      { title: 'Tuck human flag', text: 'Hold with your body horizontal, knees tucked, top arm pulling and bottom arm straight pushing.', tip: 'Keep your hips level with your shoulders.', pose: { t: 180, arm: [-125, -125], arm2: [180, 180], leg: [-60, 130], ...flagPole }, timer: 8 },
      { title: 'Progress', text: 'Extend your legs gradually to the full flag; train both sides equally.', pose: { t: 180, arm: [-125, -125], arm2: [180, 180], leg: [0, 0], ...flagPole } },
    ],
  },
  {
    id: 'typewriter-pull-up',
    name: 'Typewriter Pull-up',
    blurb: 'Slide side to side at the top',
    muscles: 'lats, biceps, grip',
    steps: [
      { title: 'Wide pull-up', text: 'Take an overhand grip well outside your shoulders and pull your chin over the bar.', pose: wideHang, pose2: wideTop, reps: 8 },
      { title: 'Top hold', text: 'Pull up until your chin is over the bar and hold with your shoulders down.', pose: wideTop, timer: 10 },
      { title: 'Side shift', text: 'From the top, shift your chest toward one hand, then toward the other, with your chin staying over the bar.', tip: 'Do not let your hips swing.', pose: { view: 'front', arm: [50, -80], leg: [90, 90], anchor: 'bar', headDx: -9 }, pose2: { view: 'front', arm: [50, -80], leg: [90, 90], anchor: 'bar', headDx: 9 }, reps: 5 },
      { title: 'Straighten one arm', text: 'As you slide to one side, extend the opposite arm straight while the other bends deeply.', pose: { view: 'front', arm: [-8, -8], arm2: [130, -100], leg: [90, 90], anchor: 'bar', headDx: -6 }, pose2: { view: 'front', arm: [50, -80], arm2: [188, 188], leg: [90, 90], anchor: 'bar', headDx: 6 }, reps: 4 },
      { title: 'Full typewriter', text: 'Pull up, slide across to one hand and back to the other, then lower under control.', tip: 'Keep a hollow body and move slowly.', pose: { view: 'front', arm: [50, -80], arm2: [188, 188], leg: [90, 90], anchor: 'bar', headDx: 6 }, reps: 3 },
    ],
  },
  {
    id: 'shrimp-squat',
    name: 'Shrimp Squat',
    blurb: 'Single-leg squat, rear foot held',
    muscles: 'quads, glutes, balance',
    steps: [
      { title: 'Split squat', text: 'Take a long stride, drop your back knee to the floor and press up through your front heel.', pose: { t: -90, arm: [90, 90], leg: [110, 90], leg2: [60, 150] }, pose2: { t: -90, arm: [90, 90], leg: [35, 100], leg2: [95, 175] }, reps: 8 },
      { title: 'Hold the rear foot', text: 'Stand on one leg, bend the other knee behind you and grab your foot with the same-side hand.', tip: 'Keep your chest up and standing knee over your toes.', pose: shrimpUp, timer: 15 },
      { title: 'Assisted shrimp', text: 'Hold a support with one hand and lower with the rear foot held until your back knee touches a pad. Press back up.', pose: shrimpUp, pose2: shrimpDown, reps: 5 },
      { title: 'Full shrimp squat', text: 'Lower slowly on one leg, lean forward for balance and touch your rear knee to the floor behind your heel.', tip: 'Do not drop down; control the final inches.', pose: shrimpUp, pose2: shrimpDown, reps: 5 },
      { title: 'Progress', text: 'Add reps and slow the lowering to 5 seconds, then try without holding the foot.', pose: shrimpDown },
    ],
  },
  {
    id: 'ninety-degree-push-up',
    name: '90° Push-up',
    blurb: 'Lower from handstand to planche',
    muscles: 'shoulders, triceps, core',
    steps: [
      { title: 'Handstand strength', text: 'Be able to hold a freestanding handstand for 30 seconds and do 5 wall handstand push-ups first.', pose: hs, timer: 20 },
      { title: 'Planche lean', text: 'Lean from a plank until your shoulders are past your hands, with straight arms.', tip: 'Keep your core tight and your elbows locked.', pose: { t: -25, arm: [105, 105], leg: [150, 155] }, timer: 15 },
      { title: 'Tuck planche hold', text: 'Hold a tuck planche on parallettes with your hips at shoulder height.', pose: { t: -5, arm: [100, 100], leg: [-10, 150] }, timer: 10 },
      { title: 'Lowering from handstand', text: 'From a wall handstand, lower while leaning your shoulders forward until your body is horizontal over bent elbows.', tip: 'Elbows stay close to your ribs.', pose: { ...hs, wall: true }, pose2: planchePush, reps: 3 },
      { title: 'Full 90° push-up', text: 'Press from the horizontal low position back up to a handstand in one flowing motion.', pose: planchePush, pose2: hs, reps: 3 },
    ],
  },
  {
    id: 'archer-pull-up',
    name: 'Archer Pull-up',
    blurb: 'Pull to one arm while the other extends',
    muscles: 'lats, biceps, grip',
    steps: [
      { title: 'Wide pull-up', text: 'Grip the bar wider than your shoulders and pull your chin over the bar with control.', pose: wideHang, pose2: wideTop, reps: 8 },
      { title: 'Side pull-up', text: 'Pull yourself toward one hand, keeping your other arm straight while your head goes past your working hand.', pose: wideHang, pose2: archerTop, reps: 5 },
      { title: 'Archer negatives', text: 'Get to the top on one side and lower slowly for 5 seconds while the other arm stays straight.', tip: 'Keep your straight arm locked.', pose: archerTop, pose2: wideHang, reps: 4 },
      { title: 'Full archer', text: 'Pull to one hand with the opposite arm straight, hips still, then lower and alternate sides.', tip: 'Pull your chest toward the working hand.', pose: wideHang, pose2: archerTop, reps: 4 },
      { title: 'Progress', text: 'Work toward the one-arm pull-up by moving your straight hand toward a band or towel and loading less each week.', pose: archerTop },
    ],
  },
]
