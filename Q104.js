app.post("/invite/:code", async (request, response) => {
  try {
    const { code } = request.params;
    const userParams = reqBody(request);
    const invite = await Invite.get({ code });
    if (!invite || invite.status !== "pending") {
      response
        .status(200)
        .json({ success: false, error: "Invite not found or is invalid." });
      return;
    }

    const { user, error } = await User.create(userParams);
    if (!user) {
      console.error("Accepting invite:", error);
      response
        .status(200)
        .json({ success: false, error: "Could not create user." });
      return;
    }

    await Invite.markClaimed(invite.id, user);
    response.status(200).json({ success: true, error: null });
  } catch (e) {
    console.error(e);
    response.sendStatus(500).end();
  }
});

// https://github.com/Mintplex-Labs/anything-llm/commit/8cd3a92c660b202655d99bee90b2864694c99946
