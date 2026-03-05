import { useMemo, useRef, useState } from 'react'
import './App.css'

const captionTemplates = [
  ['WHEN EXAM DATE DROPS', 'ME: IT IS WHAT IT IS'],
  ['ME STARTING {topic}', '5 MINUTES LATER: BREAK TIME'],
  ['WHEN SIR SAYS EASY QUESTION', 'WHOSE EASY SIR?'],
  ['ONE BACKLOG CLEARED', 'BACKLOG: I HAVE FRIENDS'],
  ['ATTENDANCE 74.9 PERCENT', 'LIFE AT 0.1 PERCENT'],
  ['GROUP PROJECT ON {topic}', 'ONLY 2 PEOPLE WORKING'],
  ['ME IN VIVA FOR {topic}', 'CONFIDENCE LEFT THE CHAT'],
  ['PLACEMENT PREP PLAN', 'PLAN PREPARING WITHOUT ME'],
  ['WHEN BUG FIXED IN PROD', 'NEW BUG UNLOCKED'],
  ['FRIEND: TRUST THE PROCESS', 'PROCESS: TRUST ISSUES'],
  ['WHEN SOMEONE SAYS ENGINEERING IS EASY', 'SHOW THEM A 7 AM LAB'],
  ['ME BEFORE EXAM ON {topic}', 'WHY DID I START STUDYING YESTERDAY'],
  ['WHEN MATLAB OPENS FOR {topic}', 'MY CONFIDENCE CLOSES'],
  ['ATTENDANCE SHORTAGE ALERT', 'NEW FEAR UNLOCKED'],
  ['ONE BACKLOG CLEARED', 'TWO MORE SPAWNED'],
  ['FRIEND: BRO JUST ONE ASSIGNMENT', 'ASSIGNMENT: 47 PAGES'],
  ['ENGINEERING LIFE', 'SLEEP IS AN OPTIONAL SUBJECT'],
  ['WHEN THE VIVA STARTS FOR {topic}', 'MY SOUL LEAVES THE BODY'],
  ['WOKE UP AT 5 FOR STUDY', 'STUDIED THE PILLOW INSTEAD'],
  ['WHEN WIFI DIES DURING SUBMISSION', 'MY HEART RATE BREAKS RECORDS'],
  ['GROUP PROJECT ON {topic}', 'ONLY TWO PEOPLE KNOW IT IS A GROUP'],
  ['INTERNAL MARKS ANNOUNCED', 'CLASS SUDDENLY BECOMES SILENT'],
  ['ME OPENING PREVIOUS YEAR PAPER', 'WHO TAUGHT THIS SYLLABUS'],
  ['WHEN LAB PARTNER SAYS RELAX', 'ENTIRE CIRCUIT STARTS SMOKING'],
  ['SIR: ANY DOUBTS?', 'ME: ONLY ABOUT MY FUTURE'],
  ['STARTED CODING ASSIGNMENT EARLY', 'BUGS ALSO STARTED EARLY'],
  ['HOSTEL FOOD TODAY', 'TRUST ISSUES EXTENDED BY ONE SEMESTER'],
  ['PLACEMENT PREP DAY 1', 'LEETCODE HUMILIATED ME POLITELY'],
  ['THIS TIME I WILL BE CONSISTENT', 'ME DISAPPEARING AFTER TWO DAYS'],
  ['WHEN PROXY ATTENDANCE FAILS', 'MISSION ABORTED'],
  ['ME EXPLAINING {topic} IN VIVA', 'TEACHER: INTERESTING FICTION'],
  ['EXAM TIMETABLE RELEASED', 'SLEEP SCHEDULE FILED FOR DIVORCE'],
  ['WHEN SENIOR SAYS EASY SUBJECT', 'THE PASS PERCENT SAYS OTHERWISE'],
  ['ONE COFFEE BEFORE STUDY', 'FIVE COFFEES LATER STILL SCROLLING'],
  ['ME STARTING MINI PROJECT', 'PROJECT STARTS ME INSTEAD'],
  ['WHEN TEAMMATE PUSHES CODE', 'PRODUCTION CATCHES FIRE'],
  ['ATTEMPTED QUESTION 1', 'QUESTION 1 ATTEMPTED ME BACK'],
  ['SUNDAY PLAN: REST', 'COLLEGE PLAN: SURPRISE ASSIGNMENT'],
  ['MORNING CLASS ATTENDANCE', 'FACE PRESENT SOUL ABSENT'],
  ['WHEN CALCULUS MEETS {topic}', 'BRAIN REQUESTED SHUTDOWN'],
  ['LAB MANUAL SAYS 3 STEPS', 'REALITY SAYS 37 STEPS'],
  ['ME IN INTERVIEW ROUND', 'SMILE BRIGHT PANIC BRIGHTER'],
  ['WHEN YOU FINALLY UNDERSTAND A TOPIC', 'EXAM ALREADY OVER'],
  ['ASKED FOR ONE HINT', 'GOT THREE NEW DOUBTS'],
  ['SEMESTER START ENERGY', 'SEMESTER END SURVIVAL MODE'],
  ['ME CHECKING RESULTS', 'BUFFERING... BUFFERING...'],
  ['CLASS TOPPER AFTER EXAM', 'IT WAS EASY YAAR'],
  ['ME AFTER HEARING SURPRISE TEST', 'SO THIS IS HOW IT ENDS'],
  ['ONE BACKLOG LEFT', 'BACKLOG: I BROUGHT FRIENDS'],
  ['WHEN YOU SKIP ONE CLASS', 'ENTIRE SYLLABUS JUMPS AHEAD'],
]

const reactionMediaLibrary = {
  panic: [
    { type: 'gif', label: 'Brahmanandam Tension', url: 'https://media1.tenor.com/m/G4qgVx8g3scAAAAd/tension-brahmanandam.gif' },
    { type: 'gif', label: 'Brahmanandam Crying', url: 'https://media1.tenor.com/m/r4yrYXyxrK0AAAAd/crying-brahmanandam-expression.gif' },
    { type: 'gif', label: 'Brahmanandam Shock', url: 'https://media1.tenor.com/m/zCHAK_W28_UAAAAd/bhibatsam-brahmanandam.gif' },
  ],
  laugh: [
    { type: 'gif', label: 'Brahmanandam Great', url: 'https://media1.tenor.com/m/mq-EzyAT8K8AAAAd/great-brahmi.gif' },
    { type: 'gif', label: 'Brahmanandam Brahmi', url: 'https://media1.tenor.com/m/J6m2-HVBBZUAAAAd/brahmanandam-brahmi.gif' },
    { type: 'gif', label: 'Brahmanandam Adhurs', url: 'https://media1.tenor.com/m/YE8iJCH-PokAAAAd/adhurs-brahmanandam.gif' },
    { type: 'gif', label: 'Brahmanandam Giphy', url: 'https://media.giphy.com/media/o9Kx4bKBvt54vppAnd/giphy.gif' },
  ],
  coder: [
    { type: 'video', label: 'Code Reaction Clip', url: 'https://media.giphy.com/media/o9Kx4bKBvt54vppAnd/giphy.mp4' },
    { type: 'video', label: 'Debug Panic Clip', url: 'https://media.giphy.com/media/RuMXIEAoTtNVzOfl8B/giphy.mp4' },
    { type: 'gif', label: 'Brahmanandam Great', url: 'https://media1.tenor.com/m/mq-EzyAT8K8AAAAd/great-brahmi.gif' },
  ],
  sleepy: [
    { type: 'gif', label: 'Brahmanandam Tired', url: 'https://media1.tenor.com/m/G4qgVx8g3scAAAAd/tension-brahmanandam.gif' },
    { type: 'video', label: 'Sleepy Reaction Clip', url: 'https://media.giphy.com/media/A3OuNXoS9BtVNCy4T8/giphy.mp4' },
    { type: 'gif', label: 'Brahmanandam Crying', url: 'https://media1.tenor.com/m/r4yrYXyxrK0AAAAd/crying-brahmanandam-expression.gif' },
  ],
  celebrate: [
    { type: 'gif', label: 'Brahmanandam Great', url: 'https://media1.tenor.com/m/mq-EzyAT8K8AAAAd/great-brahmi.gif' },
    { type: 'video', label: 'Celebration Clip', url: 'https://media.giphy.com/media/QEn1pGI5nCNE23VoF8/giphy.mp4' },
    { type: 'gif', label: 'Brahmanandam Adhurs', url: 'https://media1.tenor.com/m/YE8iJCH-PokAAAAd/adhurs-brahmanandam.gif' },
  ],
}

const expressionProfiles = [
  { name: 'Panic', key: 'panic', keywords: ['exam', 'viva', 'deadline', 'backlog', 'test', 'assignment'] },
  { name: 'Sleepy', key: 'sleepy', keywords: ['night', 'sleep', 'morning', 'lab', '7 am', 'class'] },
  { name: 'Celebrate', key: 'celebrate', keywords: ['pass', 'placed', 'internship', 'result', 'cleared', 'success'] },
  { name: 'Coder', key: 'coder', keywords: ['code', 'coding', 'matlab', 'project', 'bug', 'debug'] },
  { name: 'Laugh', key: 'laugh', keywords: ['meme', 'funny', 'bro', 'friends', 'college', 'campus'] },
]

function App() {
  const usedKeysRef = useRef(new Set())

  const [loading, setLoading] = useState(false)
  const [currentMeme, setCurrentMeme] = useState(null)

  const allMedia = useMemo(
    () => Object.values(reactionMediaLibrary).flatMap((items) => items),
    [],
  )

  const pickRandom = (items) => items[Math.floor(Math.random() * items.length)]

  const buildCaption = (captionIndex, topic) => {
    const template = captionTemplates[captionIndex]
    return [
      template[0].replaceAll('{topic}', topic),
      template[1].replaceAll('{topic}', topic),
    ]
  }

  const pickUniqueCombination = (mediaPoolLength) => {
    const total = mediaPoolLength * captionTemplates.length
    if (usedKeysRef.current.size >= total) {
      usedKeysRef.current.clear()
    }

    let mediaIndex = 0
    let captionIndex = 0
    let key = ''
    let guard = 0

    do {
      mediaIndex = Math.floor(Math.random() * mediaPoolLength)
      captionIndex = Math.floor(Math.random() * captionTemplates.length)
      key = `${mediaIndex}-${captionIndex}`
      guard += 1
    } while (usedKeysRef.current.has(key) && guard < 200)

    usedKeysRef.current.add(key)
    return { mediaIndex, captionIndex }
  }

  const onGenerateMeme = () => {
    setLoading(true)
    const profile = pickRandom(expressionProfiles)
    const mediaPool = reactionMediaLibrary[profile.key] || allMedia

    const { mediaIndex, captionIndex } = pickUniqueCombination(mediaPool.length)
    const media = mediaPool[mediaIndex]
    const [topText, bottomText] = buildCaption(captionIndex, 'THIS SUBJECT')

    setCurrentMeme({
      media,
      expression: profile.name,
      topText,
      bottomText,
    })
    setLoading(false)
  }

  return (
    <div className="app-shell">
      <main className="meme-card">
        <section className="controls">
          <h1>Meme Generator</h1>

          <div className="btn-row">
            <button type="button" onClick={onGenerateMeme} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Meme'}
            </button>
          </div>
        </section>

        <section className="preview">
          {!currentMeme && (
            <div className="placeholder-preview">
              <h3>Preview</h3>
              <p>Click Generate Meme</p>
            </div>
          )}

          {currentMeme && (
            <div className="media-stage">
              {currentMeme.media.type === 'video' ? (
                <video
                  key={currentMeme.media.url}
                  className="meme-media"
                  src={currentMeme.media.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img key={currentMeme.media.url} className="meme-media" src={currentMeme.media.url} alt={currentMeme.media.label} />
              )}
              <div className="caption top">{currentMeme.topText}</div>
              <div className="caption bottom">{currentMeme.bottomText}</div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
