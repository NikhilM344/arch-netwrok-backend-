import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(environmentconfigs.GoogleApiKey);

export const signUpWithGoogle = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    sendResponse(res, 400, false, "Invalid Google User", null);
    return;
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: environmentconfigs.GoogleApiKey,
  });

  const payload = ticket.getPayload();

  if (!payload.email_verified) {
    return sendResponse(
      res,
      400,
      false,
      "Email is not verified by Google",
      null
    );
  }

  const { sub, email, given_name, family_name, picture } = payload;

  let user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    user = await db.User.create({
      userName: `${given_name} ${family_name}`,
      email,
      provider: "google",
    });
  }

  const GenratedTokenpayload = {
    id: user.id,
    email: user.email,
    provider: user.provider,
    userName: user.userName,
  };

  const genratedToken = createTokenForUser(GenratedTokenpayload);

  res.cookie("token", genratedToken, {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, 200, true, "Authenticated SuccessFully", {
    user: GenratedTokenpayload,
    token,
  });
});
