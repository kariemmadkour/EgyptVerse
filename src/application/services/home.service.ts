import { container } from "@/infrastructure/di/container";

export async function getHomeShowcaseData() {
  const [featuredBooks, featuredObjects, exhibitions, upcomingEvents, latestNews, eras] =
    await Promise.all([
      container.library.getFeaturedBooks(4),
      container.museum.getFeaturedObjects(4),
      container.exhibitions.listExhibitions(),
      container.events.getUpcomingEvents(3),
      container.news.getLatestArticles(3),
      container.timelines.listEras(),
    ]);

  return {
    featuredBooks,
    featuredObjects,
    currentExhibition: exhibitions.find((e) => e.status === "current") ?? exhibitions[0],
    upcomingEvents,
    latestNews,
    eras,
  };
}
