---
'@mgdis/mg-components': patch
---

[#615](https://gitlab.mgdis.fr/core/core-ui/core-ui/-/work_items/615) mg-form: the Storybook story and the component documentation no longer show or recommend disabling the submit button while the form is invalid. The submit button stays enabled and validation happens on submission (or on demand via `displayError()`), in line with the UX/UI guideline. No component behaviour change.
