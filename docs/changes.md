# Change Logs

Keep up with the latest updates here :D

## 2025-08-24

### Fixed

- Fixed profile saving loading indefinitely on Google callback page when username already exists ([#108](https://github.com/beatcode-official/client/pull/108)).

---

## 2025-04-30

## Fixed

- Spam-submitting the same solution will no longer deal damage to the bot ([#68](https://github.com/beatcode-official/server/pull/68))

---

## 2025-04-17

### Added

- Added Practice Mode ([#65](https://github.com/beatcode-official/server/pull/65))

### Fixed

- Buggy animation on the home page

---

## 2025-03-02

### Added

- Added a changelog page to keep track of updates ([#90](https://github.com/beatcode-official/client/pull/90)).

---

## 2025-02-28

### Fixed

- Fixed a major bug causing users unable to join games ([#57](https://github.com/beatcode-official/server/pull/57)).

---

## 2025-02-25

### Fixed

- Fixed a glitch when clicking the home button.
- Fixed WebSocket connection issues for games.

---

## 2025-02-24

### Added

- Users can now see each other's ratings in game ([#56](https://github.com/beatcode-official/server/pull/56), [#89](https://github.com/beatcode-official/client/pull/89)).
- Added a leave game button for loading menu ([#86](https://github.com/beatcode-official/client/pull/86)).
- Added a page for showcasing abilities ([#82](https://github.com/beatcode-official/client/pull/82)).

### Fixed

- Fixed `deletio` causing infinite loop for empty editor ([#84](https://github.com/beatcode-official/client/pull/84)).
- Reduced backend request volumes for public pages ([#80](https://github.com/beatcode-official/client/pull/80)).
- Fixed Python not parsing boolean inputs correctly and "Plus One" problem ([#52](https://github.com/beatcode-official/server/pull/52)).

---

## 2025-02-23

### Added

- Added Vim bindings for editor ([#78](https://github.com/beatcode-official/client/pull/78)).

### Updated

- Small styling tweaks for landing page.

---

## 2025-02-22

### Added

- Added `freezio` (freeze your opponent) and `rickrollio` (rickroll your opponent) ([#76](https://github.com/beatcode-official/client/pull/76)).
- Added playground for testing abilities ([#75](https://github.com/beatcode-official/client/pull/75)).

---

## 2025-02-20

### Added

- Added "Sign in as guest" option for login page.

### Updated

- Added better images for landing page ([#71](https://github.com/beatcode-official/client/pull/71)).

---

## 2025-02-19

### Added

- Print out logs for any stdout (`print`, `cout`, `System.out.println`) ([#70](https://github.com/beatcode-official/client/pull/70)).
- Better error highlight effects.

### Fixed

- Fixed lag issues when users spam submitting.
- Fixed syntax highlighting not changing when switching languages.

---

## 2025-02-18

### Added

- Added Java and C++ ([#43](https://github.com/beatcode-official/server/pull/43), [#68](https://github.com/beatcode-official/client/pull/68)).

### Fixed

- Fixed test 1 of "Valid Palindrome" problem.

---

## 2025-02-17

### Fixed

- Small fix for displaying input.

---

## 2025-01-19

### Added

- Added rank badges for homepage ([#66](https://github.com/beatcode-official/client/pull/66)).

### Updated

- User's info will now be stored in HTTP-only cookies.

---

## 2025-01-18

### Updated

- Added fading effects for page transitions ([#63](https://github.com/beatcode-official/client/pull/63)).

---

## 2025-01-15

### Fixed

- Fixed cookie problem when logging in with Gooogle and payment.

---

## 2025-01-14

### Added

- Added 2 abilities: `hugio` (make your code 2x bigger) and `smallio` (make your code 1/2 smaller).

### Updated

- Updated `healio`'s MP from 5 to 20 ([#37](https://github.com/beatcode-official/server/pull/37), [#60](https://github.com/beatcode-official/client/pull/60), [#62](https://github.com/beatcode-official/client/pull/62)).

---

## 2025-01-12

### Added

- Added Google authentication with avatar ([#35](https://github.com/beatcode-official/server/pull/35), [#56](https://github.com/beatcode-official/client/pull/56)).
- Added highlighting for errors ([#58](https://github.com/beatcode-official/client/pull/58)).

---

## 2025-01-11

### Added

- Privacy Policy and Terms and Conditions pages ([#55](https://github.com/beatcode-official/client/pull/55)).

---

## 2025-01-09

### Added

- Settings and Forgot Password pages ([#54](https://github.com/beatcode-official/client/pull/54)).

---

## 2025-01-05

### Fixed

- Optimized image rendering for landing page ([#53](https://github.com/beatcode-official/client/pull/53)).
- Fixed `healio` not being capped at max health.
- Cache code so that code is preserved when reloading game page.
- Removed SSR for room and game pages ([#51](https://github.com/beatcode-official/client/pull/51)).

### Updated

- Added a panel after game ended ([#53](https://github.com/beatcode-official/client/pull/53)).

---

## 2025-01-04

### Added

- Added difficulty badge and a link button for LeetCode problems ([#31](https://github.com/beatcode-official/server/pull/31), [#43](https://github.com/beatcode-official/client/pull/43)).
- Added a chat panel ([#45](https://github.com/beatcode-official/client/pull/45)).

### Fixed

- `deletio` will only delete non-empty lines ([#46](https://github.com/beatcode-official/client/pull/46)).
- Fixed a bug where guests got yanked out when joining custom room ([#44](https://github.com/beatcode-official/client/pull/44)).

### Updated

- Guests will not be able to play unranked and ranked games.

---

## 2025-01-03

### Added

- Added skeleton loading animation for games ([#41](https://github.com/beatcode-official/client/pull/41)).

---

## 2024-12-11

### Added

- Added Unranked and Ranked modes ([#16](https://github.com/beatcode-official/client/pull/16)).

---

## 2024-12-10

### Added

- Added runtime analysis (had to use LLM since the other way didn't work and the deadline is tomorrow) ([#13](https://github.com/beatcode-official/server/pull/13), [#14](https://github.com/beatcode-official/client/pull/14)).
- Added lobby page ([#15](https://github.com/beatcode-official/client/pull/15)).

---

## 2024-12-07

### Fixed

- Fixed a bug where users get switched when joining ([#11](https://github.com/beatcode-official/server/pull/11) thanks [@hdngo](https://github.com/hdngo)).

---

## 2024-11-29

### Added

- Added `healio`, `lightio`, `deletio`, `syntaxio`.
- Added custom room creation.
- Added authentication.

---

## 2024-11-17

### Fixed

- Switched to CodeMirror from Monaco editor since it's hard to customize styling with Monaco.

---

## 2024-10-29

### Added

- Playing around with making a code editor.

\*_If you're reading this, thank you a lot for caring about this random project I made. You're a chad :D_
