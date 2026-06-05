# Getting started

You'll first need to clone the repo

```sh
git clone gitlab@gitlab.mgdis.fr:core/core-ui/core-ui.git
```

## pnpm

To get started, make sure you have [pnpm](https://pnpm.io/) installed and activated using [corepack](https://nodejs.org/api/corepack.html):

```sh
corepack enable
```

After that, you can install the required packages by running:

```sh
# install packages
pnpm i
```

## Project Structure

All packages should be organized within the `packages/` folder and written in [Typescript](https://www.typescriptlang.org/). Embracing TypeScript enhances the maintainability and stability of the codebase.

Packages must be initialized with version `0.0.0` and follow the `changeset` workflow. This helps to ensure proper versioning and smooth release management.

## Running Tests

Testing is crucial to maintaining code quality. You can run tests for all packages with the following command:

```sh
pnpm test
```

To generate test coverage reports, use:

```sh
pnpm coverage
```

### Generating Screenshots Across Different Environments

Since we are working on different machines (Windows, WSL, Mac, Linux, etc.), to ensure consistency with Gitlab CI, we recommend using the following Docker script to generate screenshots:

```sh
pnpm test:e2e:docker
```

If you want to generate screenshots for a specific package, you can use the following command with a filter:

```sh
pnpm test:e2e:docker --filter=@mgdis/styles
```

## Changesets and Releases

We follow a structured approach for managing changes and releases using changesets. For every new feature added, a corresponding [changeset](https://github.com/changesets/changesets) must be written.

To create a new changeset, use the following command:

```sh
pnpm change
```

There's no limit to the number of changesets for a release, as they will be merged when the release is generated.

You can preview what will be released using:

```sh
pnpm release:status
```

To check the files the release script will commit (remember to discard changes after), use:

```sh
pnpm release:preview
```

Finally, to initiate a release for all relevant packages, use:

```sh
pnpm release
```

**`BE CAREFUL`. The above command will bump versions, create changelogs, make a commit, and push changes.**

### Troubleshooting the release pipeline

`pnpm release` pushes a tag, which triggers the `release` stage in CI. Two kinds of jobs there rely on tokens stored as **CI/CD variables** (GitLab → _Settings → CI/CD → Variables_; they may be inherited from a parent group). When a release fails on auth, this is where to look.

#### The npm publish jobs fail (`*:npmjs`)

These publish the packages with `NPM_TOKEN`. Read the job log:

- `E401` / `ENEEDAUTH` → the token is expired or missing.
- `E403 ... Two-factor authentication or granular access token with bypass 2fa enabled is required` → the token type does not bypass the `@mgdis` org's 2FA.

Fix:

1. On npmjs.com (with a `@mgdis` account that has publish rights) → _Access Tokens → Generate New Token_, then **either**:
   - a **Granular Access Token** — _Read and write_ on the `@mgdis` packages, **with "Bypass 2FA" enabled**, or
   - a **Classic → Automation** token (bypasses 2FA by design).
   - Do **not** use a Classic _"Publish"_ token: it requires an OTP and fails in CI with the `E403` above.
2. Edit the `NPM_TOKEN` CI/CD variable with the new value (keep it _Masked_).
3. Retry the failed `*:npmjs` jobs on the release tag's pipeline.

#### The merge-request job fails (`chromatic:mr`)

It opens the next-release MR via `scripts/open-merge-request.sh` using `PERSONAL_ACCESS_TOKEN`. The script fails loudly with the HTTP status, e.g. `Failed to create merge request (HTTP 401)`.

- `HTTP 401` → the PAT value is expired/invalid, **or** the variable is flagged **Protected** while the release tag is not a protected ref (so the value reaches the job empty).

Fix:

1. Generate a GitLab PAT with the **`api`** scope (required to create the branch and the MR), with a far-off expiry.
2. Edit the `PERSONAL_ACCESS_TOKEN` CI/CD variable with the new value.
3. If `PERSONAL_ACCESS_TOKEN` is flagged **Protected**, make sure the release tags match a pattern under _Settings → Repository → Protected tags_ — otherwise uncheck _Protected_ on the variable.
4. Retry the `chromatic:mr` job.
