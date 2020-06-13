/**
 * History configuration for React's DOM
 *
 * @author Richard Nguyen <richard.ng0616@gmail.com>
 */
import {
  createBrowserHistory,
  createMemoryHistory,
  History,
  MemoryHistory,
  MemoryHistoryBuildOptions,
} from "history";

const createHistory = ({ initialEntries }: MemoryHistoryBuildOptions = {}):
  | History
  | MemoryHistory => {
  if (__BROWSER__) {
    const history = window.browserHistory || createBrowserHistory();
    if (process.env.NODE_ENV === "development" && !window.browserHistory) {
      window.browserHistory = history;
    }

    return history;
  }
  return createMemoryHistory({ initialEntries });
};

export default createHistory;
