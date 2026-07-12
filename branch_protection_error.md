# GitHub Branch Protection Error

The GitHub Actions workflow failed because the **`main` branch** on your GitHub repository is protected. GitHub's branch protection rules block direct pushes to `main` and require changes to be made via a Pull Request.

## The Error Message from Your Workflow Run
```text
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: - Changes must be made through a pull request.
...
! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/keshavsoft/kschema-fs-api-gen-get-actions'
```

---

## How to Fix It (To Allow Direct Push to `main`)

To allow the GitHub Actions workflow to directly modify `package.json` on the `main` branch without a pull request, you need to adjust the branch protection settings:

1. **Open the repository in your web browser**:
   Go to `https://github.com/keshavsoft/kschema-fs-api-gen-get-actions`

2. **Navigate to Settings**:
   Click on the **Settings** tab in the top menu of your repository.

3. **Go to Branches**:
   In the left sidebar, click on **Branches** (under the "Code and automation" section).

4. **Edit the Rule for `main`**:
   Find the branch protection rule for the `main` branch and click **Edit**.

5. **Configure Bypassing the Pull Request Requirement**:
   * **Option A (Disable completely):** Uncheck **Require a pull request before merging**. This allows direct pushes to `main` for everyone.
   * **Option B (Allow bypass using a Personal Access Token / PAT):**
     Since the built-in **`github-actions[bot]`** is a system user and **cannot** be added to the bypass list directly, we must use a Personal Access Token (PAT) belonging to an administrator:
     1. **You already have a `REPO_DISPATCH_TOKEN` secret** configured in your repository secrets.
     2. We have updated your [update-dependency.yml](file:///d:/KeshavSoftRepos/2026-07-12(1)/kschema-fs-api-gen-get-actions/.github/workflows/update-dependency.yml) file to checkout the repository using this token instead of the default `GITHUB_TOKEN`:
        ```yaml
        - uses: actions/checkout@v4
          with:
            token: ${{ secrets.REPO_DISPATCH_TOKEN }}
        ```
     3. Ensure that the owner of the `REPO_DISPATCH_TOKEN` has administrator access to the repository, or add that user to the **"Allow specified actors to bypass required pull requests"** list in your branch protection settings.



