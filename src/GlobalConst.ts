
/**
 * NKey_ : Navigation keys
 * EKey_ : Event keys
 * RKey_ : Routing keys
 * AKey_ : Authentication/Authorization keys
 */

export const NKey_NavLogin = "/login";
export const EKey_SubmitLogin = "login?";
export const NKey_NavLogout = "/logout";
export const EKey_SubmitLogout = "logout?";
export const NKey_NavRegister = "/register";
export const EKey_SubmitRegister = "register?";

export const NKey_NavViewUsers = "/viewUsers";
export const NKey_NavAccount = "/manageAccount";

export const NKey_NavForum = "/forum";
export const EKey_SubmitForum = "forum?";

export const NKey_NavTopic = "/topic";
export const EKey_SubmitTopic = "topic?";
export const NKey_NavPost = "/post";
export const EKey_SubmitPost = "post?";

export const RKey_Wildcard = "/*";
export const RKey_SubId = ":id/*";

export const EKey_ForumsLoaded = "forum_loading_complete";
export const EKey_TopicsLoaded = "topic_loading_complete";
export const EKey_PostsLoaded = "post_loading_complete";
export const EKey_ArticlesLoaded = "article_loading_complete";

export const AKey_ForumNotAuth = "You are not permitted to access this forum.";