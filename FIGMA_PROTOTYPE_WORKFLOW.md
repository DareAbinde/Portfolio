# Figma Image + Video Prototype Workflow

Use this workflow for every embedded prototype, video mockup, laptop/Mac frame, phone frame, or image-inside-image composition in the FINAL portfolio.

## Source Of Truth

- Figma is the source of truth for position, size, crop, overflow, opacity, and layering.
- Do not flatten, approximate, or visually guess the composition.
- Do not force prototype frames into generic thumbnail image rules.
- If a local asset is provided, compare whether it is a raw source image or an already-rendered composite before using it.

## Required Steps

1. Call `get_design_context` for the exact prototype/mockup node, not only the parent page.
2. Read every nested layer property:
   - parent/group width and height
   - child x/y offsets
   - image container size
   - inner image fill crop percentages
   - video/screen rectangle size and position
   - overflow behavior
   - z-index/layer order
3. Recreate the same layer tree in React/CSS:
   - wrapper/group element
   - device frame container
   - inner image with exact fill crop
   - video/screen layer at exact coordinates
4. Download and commit the exact Figma source asset when the Figma source differs from a provided local composite.
5. Use local provided video files only inside the Figma screen rectangle, never as a replacement for the device frame.
6. Verify the dev server is serving the latest source after changes; restart Vite if stale.

## Example: Climate Hub Homepage Prototype

Figma node: `2793:583` (`prototype play`)

- Prototype group: `400 x 340.313`
- Group position inside thumbnail: `left: 31px`, `top: 51px`
- Mac container: `400 x 299`, `top: -3px`
- Mac image fill:
  - `width: 100.83%`
  - `height: 168.58%`
  - `left: -0.83%`
  - `top: -19.73%`
- Video/screen:
  - `width: 369.063px`
  - `height: 211.25px`
  - `left: 15px`
  - `top: 14.69px`

Important: the Figma Mac source was different from the local `CH mac.png`, so the implementation uses the exact Figma source image and applies the Figma fill crop values.

## Rule

If the prototype does not look right, do not nudge values by eye. Re-open the exact child node in Figma, read the layer values, and update the code to match them.
