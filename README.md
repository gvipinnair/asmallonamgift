# Gowri Onam Surprise — Updated

## Exact opening
1. `sc-1.mp4` plays FIRST, with its original audio unchanged.
2. When `sc-1.mp4` ends, `Animated Book.mp4` starts.
3. The Animated Book pauses around 8.5s on the fully-open green page.
4. `For Gowri` is overlaid on that green page.
5. `Shall we start? ✨` appears.

## Scene messages
- SC-2 popup: after 3 seconds.
- SC-4 popup/button after 3 seconds.
- SC-5 popup/button after 3 seconds.
- SC-6 popup after 3 seconds: `നീ റെഡിയാണോ ഓണപ്പൂക്കളം കാണാൻ?`
- SC-6 button appears after 3 seconds.

All popups are at the bottom and do not cover faces. Buttons are bottom-right and use a different green colour.

## Final
Open door -> smaller Gowri pookalam -> Gowri voice -> animated postcard.


### Audio update
- `gowri-voice.mp3` starts when SC-2 begins and continues through SC-3, SC-4, SC-5, SC-6, pookalam and postcard without restarting.
- The pookalam is displayed as a circular floral portrait rather than a square image.


### SC-3 audio


## v8 fix
The Animated Book video is forced to fill the book stage at 16:9 so browser zoom cannot make the green page and the For Gowri overlay drift apart. The For Gowri design is clipped to the actual green-page area.


### Latest corrections (v10)
- The real green page from Animated Book.mp4 is never replaced by a CSS green rectangle. The For Gowri text is overlaid only inside the actual page area.
- Gowri voice starts once at SC-2 and is never paused/rewound by normal scene changes; only Replay resets it.


## Voice handoff
At the pookalam reveal, `gowri-voice.mp3` plays first. When it naturally finishes, `gowri-voice-2.mp3` starts automatically without a gap/restart. The postcard appears after voice 2 finishes.

## Voice sequence
`gowri-voice.mp3` plays first. The instant it naturally ends, `gowri-voice-2.mp3` starts. When voice 2 ends, the postcard appears.
