exports.config = {
  sonar: {
    projects: [process.env.CI_PROJECT_NAME],
    messageOnSuccess: false,
  },
  changeset: true,
  autotag: [
    { users: ['@core/core-ui'] }, // tagged for all the MRs
  ],
};
