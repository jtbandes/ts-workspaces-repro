## Issue when combining yarn workspaces, type-only imports, `webpack --watch`, `fork-ts-checker-webpack-plugin`

Type-only imports (`import type X`, or `import X` where X is only used as a type) result in incorrect `webpack --watch` behavior. When files residing in workspace packages are modified, the importing code does not always get recompiled.

Steps to reproduce:

1. Run `yarn install && yarn webpack --watch --progress --mode=development`

2. Modify `type Example1` in [packages/pkg1/index.ts](packages/pkg1/index.ts). Observe that webpack **does not** recompile `src/index.ts` nor display new type errors. ❌

3. Modify `function Example2` in [packages/pkg2/index.ts](packages/pkg2/index.ts). Observe that webpack **does** recompile `src/index.ts` and display new type errors (this is not a type-only import). ✅

4. Add
    `"compilerOptions": { "importsNotUsedAsValues": "preserve" }` to [tsconfig.json](tsconfig.json). Now, observe that changing `pkg1/index.ts` **does** cause webpack to recompile. ✅
    - Change `import {Example1} from 'pkg1'` to `import type {Example1} from 'pkg1'` in [src/index.ts](src/index.ts). Observe that changing `pkg/1index.ts` again **does not** result in a recompile. ❌
