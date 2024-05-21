# Media grid plugin for Payload CMS

> # This will not work yet.

## Installation

```
pnpm add payload-media-grid-plugin
```

## Usage

```typescript
import Media from "../collections/Media";
import mediaGridPlugin from "payload-media-grid-plugin";

export default buildConfig({
	collections: [Media],
	plugins: [
		mediaGridPlugin({
			collections: {
				[Media.slug]: true,
			},
		}),
	],
});
```
