import Country from "./components/Country";
import HomePage from "./components/HomePage";

const routers = [
  {
    url: '/',
    component: <HomePage />,
  },
  {
    url: '/country',
    component: <Country />,
  }
]

export function getPage(url) {
  return routers.findLast(route => url.startsWith(route.url)).component || <HomePage />;
}