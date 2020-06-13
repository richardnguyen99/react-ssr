/**
 * Defines routes to handle request url
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import { RouteProps as ReactRouterProps } from "react-router";

import { HomeComponent, AboutComponent, UserComponent } from "../components";

interface RouteProps extends ReactRouterProps {
  key: string;
}

const routes: RouteProps[] = [
  {
    key: "home-page",
    path: "/",
    component: HomeComponent,
    exact: true,
  },
  {
    key: "about-page",
    path: "/about",
    component: AboutComponent,
    exact: true,
  },
  {
    key: "user-page",
    path: "/user",
    component: UserComponent,
    exact: true,
  },
];

export default routes;
