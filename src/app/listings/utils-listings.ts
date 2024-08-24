export interface Reaction {
  id: number;
  emoji: string;
  label: string;
  count: number;
}

export const reactions: Reaction[] = [
  { id: 1, emoji: "👍", label: "Like", count: 0 },
  { id: 2, emoji: "❤️", label: "Love", count: 0 },
  { id: 3, emoji: "😊", label: "Happy", count: 0 },
  { id: 4, emoji: "🎉", label: "Celebrate", count: 0 },
  { id: 5, emoji: "😍", label: "Adore", count: 0 },
  { id: 6, emoji: "✨", label: "Would Love to Have", count: 0 },
];

export const validColors: string[] = [
  "black",
  "white",
  "blue",
  "red",
  "green",
  "yellow",
  "pink",
  "grey",
  "brown",
  "orange",
  "purple",
  "turquoise",
  "other",
  "none chosen",
];

export const validCountries: string[] = [
  "Finland",
  "Sweden",
  "Norway",
  "Denmark",
  "Iceland",
  "Germany",
  "Estonia",
  "UnitedKingdom",
  "Japan",
  "USA",
  "Other",
];

export function transformImageUrl(url: string): string {
  const transformationString = "q_auto,f_auto,w_500"; // Example transformations
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/${transformationString}/${parts[1]}`;
}

export const fetchSearchResults = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_FETCH_LISTINGS
      }?searchTerm=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const combinedResults = [
      ...data.listings,
      ...data.userMatches.map((user: any) => ({ ...user, type: "user" })),
    ];
    return combinedResults;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

export const handleFavoriteClick = async (
  listingId: string,
  toggleFavorite: (listingId: string, token: string) => Promise<void>,
  token: string | null
) => {
  if (token) {
    await toggleFavorite(listingId, token);
  } else {
    alert("You need to be logged in to add to favorites.");
  }
};

export const toggleFavorite = async (
  listingId: string,
  setFavoritedListings: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >,
  token: string
) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TOGGLE_FAVORITE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listingId }),
    });
    if (response.ok) {
      const result = await response.json();
      setFavoritedListings((prev) => ({
        ...prev,
        [listingId]: result.message === "Favorite added",
      }));
    } else {
      console.error("Failed to toggle favorite:", response.statusText);
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
};

export const fetchReactionsForProducts = async (
  filteredProducts: any[],
  setProductReactions: React.Dispatch<
    React.SetStateAction<Record<string, Record<string, number>>>
  >
) => {
  try {
    const productIds = filteredProducts.map((product) => product.id);
    const requestData = { productIds };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GET_EXISTING_EMOJI_REACTIONS_FOR_MULTIPLE_PRODUCTS}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const reactionsData = await response.json();

    const transformedReactions = reactionsData.reduce(
      (acc: Record<string, Record<string, number>>, reaction: any) => {
        const { listing, reaction: reactionType, count } = reaction;
        if (!acc[listing]) acc[listing] = {};
        acc[listing][reactionType] = (acc[listing][reactionType] || 0) + count;
        return acc;
      },
      {}
    );

    setProductReactions(transformedReactions);
  } catch (error) {
    console.error("Error fetching reactions:", error);
  }
};

export const checkAllFavoritedStates = async (
  token: string,
  filteredProducts: any[],
  setFavoritedListings: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >
) => {
  if (filteredProducts.length > 0) {
    const listingIds = filteredProducts.map((product) => product.id);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CHECK_IF_BATCH_OF_LISTINGS_ARE_FAVORITED}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ listingIds }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite statuses");
      }

      const favoritedStatuses = await response.json();
      setFavoritedListings(favoritedStatuses);
    } catch (error) {
      console.error("Error fetching favorite statuses:", error);
    }
  }
};
