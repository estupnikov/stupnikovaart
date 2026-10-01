# Content requiring confirmation

Implementation source: GitHub HEAD `9a30584113eafaf813db59500ea42d9ddd11ff3d` (confirmed via the connected GitHub app on 2026-10-01).

All existing artwork records, prices, statuses, texts, and asset files are preserved. Their presence in a prototype is not independent confirmation of the underlying facts. The user confirmed that these should remain provisional; visible notes flag this on Home, Works, Available now, and artwork pages. Confirm these records before production publication.

- `number` is marked `available:false, sold:true` in the source. No new sold status has been assigned.
- The mockup labels Rhythm 2.0 as 80×30 cm; the repository says 80×80 cm. The repository value remains.
- The mockup labels Lessons of Happiness as 60×60 cm, 2023; the repository says 2024. The repository value remains.
- The mockup's Uprooted image depicts roots/tentacles. `assets/uprooted.jpg` in the repository depicts a bear on a lamplit path. The existing image-to-record association remains; confirm that it is correct.
- Several works pictured in the mockup are absent from the repository, including Let's Play, The Land of the Free?, Reality Stitchers, Roots of Unease, and Rule of two walls. No substitute titles or artwork records have been invented.
- Email `stupnikova.art@gmail.com` was supplied by the user and is linked on Contact. Artwork enquiries prefill the email subject. Instagram URL remains absent and shows an explicit placeholder.
- About requires a biography and artist portrait/studio photograph. A neutral portrait placeholder and existing selected paintings are provided.
- Exhibition title “UnChildLike World” is inherited from a page explicitly labelled as an example. Year, location, photograph associations, and exhibited artwork IDs require confirmation. The example is labelled accordingly; no exhibition-to-work associations have been invented.
- Reservation, installment, flexible payment, shipping, and returning-collector statements are inherited from the repository/user specification. Confirm practical terms before publication.
- UA and SK are language placeholders, not working translations. English remains primary; no language switch is simulated.
- No genuine additional artwork or process images are supplied. Detail thumbnails render only if a record supplies `detailImages: ['assets/…', …]`. Process placeholders remain clearly labelled.

## Implementation notes

Static HTML, CSS, and JavaScript remain the implementation. No build step or generated imagery is introduced. Collection order is deliberate and independent in Works and Available now. Available now additionally filters `available === true`. Artwork tabs support keyboard navigation; the header remains visible on all page sizes, including pages that previously did not load JavaScript.
