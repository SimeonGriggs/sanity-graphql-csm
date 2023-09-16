import {NavLink} from '@remix-run/react'

export default function Nav() {
  return (
    <ul className="flex justify-center space-x-4 p-4 bg-white text-blue-500 font-semibold">
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? 'bg-blue-700 px-3 py-2 rounded text-white' : 'px-3 py-2 rounded'
          }
          to="/"
        >
          Default
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? 'bg-blue-700 px-3 py-2 rounded text-white' : 'px-3 py-2 rounded'
          }
          to="/perspectives"
        >
          Perspectives
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? 'bg-blue-700 px-3 py-2 rounded text-white' : 'px-3 py-2 rounded'
          }
          to="/csm"
        >
          CSM
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({isActive}) =>
            isActive ? 'bg-blue-700 px-3 py-2 rounded text-white' : 'px-3 py-2 rounded'
          }
          to="/both"
        >
          Both
        </NavLink>
      </li>
    </ul>
  )
}
