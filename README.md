# Gowri Onam Surprise — Updated

## Exact opening
1. `sc-1.mp4` plays FIRST, with its original audio unchanged.
2. When `sc-1.mp4` ends, `Animated Book.mp4` starts.
3. The Animated Book pauses around 8.5s on the fully-open green page.
4. `For Gowri` is overlaid on that green page.
5. `Shall we start? ✨` appears.

## Scene messages
- SC-2 popup: after 3 seconds.
- SC-3 Malare BGM starts immediately; popup after 3 seconds; button after 5 seconds.
- SC-4 popup/button after 3 seconds.
- SC-5 popup/button after 3 seconds.
- SC-6 popup after 3 seconds: `നീ റെഡിയാണോ ഓണപ്പൂക്കളം കാണാൻ?`
- SC-6 button appears after 3 seconds.

All popups are at the bottom and do not cover faces. Buttons are bottom-right and use a different green colour.

## Final
Open door -> smaller Gowri pookalam -> Gowri voice -> animated postcard.


### Audio update
- `gowri-voice.mp3` starts when SC-2 begins and continues through SC-3, SC-4, SC-5, SC-6, pookalam and postcard without restarting.
- During SC-3, `malare-bgm.mp3` plays underneath at low volume (20%), while Gowri voice remains louder.
- The pookalam is displayed as a circular floral portrait rather than a square image.


### SC-3 audio
During SC-3, `malare-bgm.mp3` is the louder/main track and `gowri-voice.mp3` continues underneath at low volume. Outside SC-3, Gowri voice returns to normal volume.


## v8 fix
The Animated Book video is forced to fill the book stage at 16:9 so browser zoom cannot make the green page and the For Gowri overlay drift apart. The For Gowri design is clipped to the actual green-page area.


### Latest corrections (v10)
- The real green page from Animated Book.mp4 is never replaced by a CSS green rectangle. The For Gowri text is overlaid only inside the actual page area.
- Gowri voice starts once at SC-2 and is never paused/rewound by normal scene changes; only Replay resets it.
- In SC-3, Gowri voice is 72% and Malare BGM is 32%.
