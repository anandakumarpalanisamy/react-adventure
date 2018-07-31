/**
 * React Adventure
 * @author Marcos Gonçalves <contact@themgoncalves.com>
 * @version 2.2.0
 */

import Loadable from 'hoc/loadable';

const RestrictedAreaScreenAsync = Loadable({
  loader: () => import(/* webpackChunkName: "restricted-area" */ './screen'),
});

const RestrictedAreaRoute = [
  {
    path: '/restricted-area',
    exact: true,
    component: RestrictedAreaScreenAsync,
  },
];

export default RestrictedAreaRoute;
