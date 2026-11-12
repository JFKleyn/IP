// Cloudflare Pages Function
// Endpoint: /api/instagram

const INSTAGRAM_API = "https://graph.instagram.com";

export async function onRequestGet({ env }) {
  try {
    const accessToken = env.INSTAGRAM_ACCESS_TOKEN;
    const userId = env.INSTAGRAM_USER_ID;

    // Instagram has not been connected yet.
    if (!accessToken || !userId) {
      return Response.json(
        {
          configured: false,
          posts: [],
          message: "Instagram integration is not configured yet.",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // Retrieve Instagram posts.
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "thumbnail_url",
      "permalink",
      "timestamp",
      "children{media_type,media_url,thumbnail_url}",
    ].join(",");

    const url = new URL(
      `${INSTAGRAM_API}/${encodeURIComponent(userId)}/media`
    );

    url.searchParams.set("fields", fields);
    url.searchParams.set("limit", "100");
    url.searchParams.set("access_token", accessToken);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error(
        "Instagram API error:",
        response.status,
        await response.text()
      );

      return Response.json(
        {
          configured: true,
          posts: [],
          error: "Unable to retrieve Instagram posts.",
        },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Convert Instagram API results into gallery posts.
    const posts = (data.data || [])
      .map((post) => {
        const firstChild = post.children?.data?.[0];

        const image =
          post.media_type === "VIDEO"
            ? post.thumbnail_url || post.media_url
            : post.media_type === "CAROUSEL_ALBUM"
              ? post.media_url ||
                firstChild?.thumbnail_url ||
                firstChild?.media_url
              : post.media_url;

        return {
          id: post.id,
          image,
          caption: post.caption || "",
          permalink: post.permalink,
          timestamp: post.timestamp,
        };
      })
      .filter((post) => post.image && post.permalink);

    return Response.json(
      {
        configured: true,
        posts,
        nextCursor: data.paging?.cursors?.after || null,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300",
        },
      }
    );
  } catch (error) {
    console.error("Instagram Function error:", error);

    return Response.json(
      {
        configured: true,
        posts: [],
        error: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}