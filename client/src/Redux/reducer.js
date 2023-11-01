import {
  GET_PAISES,
  GET_DETAIL,
  GET_NAME,
  POST_ACT,
  SORT_CONTINENT,
  SORT_ACTIVITY,
  GET_ACTIVITIES,
  RESET_FILTERS,
} from "./actions";

const initialState = {
  paises: [],
  paisesCopy: [],
  countryDetail: [],
  continentFilter: "",
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAISES:
      return {
        ...state,
        paises: action.payload,
        paisesCopy: action.payload,
        activities: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_NAME:
      return {
        ...state,
        paises: action.payload,
      };
    case POST_ACT:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case SORT_CONTINENT:
      if (action.payload) {
        let continents =
          action.payload === "todos"
            ? state.paisesCopy
            : state.paisesCopy.filter((c) => c.continents === action.payload);
        return {
          ...state,
          paises: continents,
          continentFilter: action.payload,
        };
      }
      return {
        ...state,
        continentFilter: "",
      };
    case SORT_ACTIVITY:
      if (action.payload !== "none") {
        const filteredPaises = state.paisesCopy.filter((pais) => {
          if (pais.Activities) {
            return pais.Activities.some(
              (activity) => activity.nombre === action.payload
            );
          } else {
            return false;
          }
        });
        return {
          ...state,
          paises: filteredPaises,
        };
      } else {
        return {
          ...state,
          paises: state.paisesCopy,
        };
      }
    case RESET_FILTERS:
      return {
        ...state,
        paises: state.paisesCopy,
        continentFilter: "",
        selectedActivity: "none",
      };

    case "ORDER_ASC": {
      const sortedPaises = state.paises
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      return {
        ...state,
        paises: sortedPaises,
      };
    }
    case "ORDER_DESC": {
      const sortedPaises = state.paises
        .slice()
        .sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        paises: sortedPaises,
      };
    }
    case "POPULATION_ASC": {
      const sortedPaises = state.paises
        .slice()
        .sort((a, b) => a.population - b.population);
      return {
        ...state,
        paises: sortedPaises,
      };
    }
    case "POPULATION_DESC": {
      const sortedPaises = state.paises
        .slice()
        .sort((a, b) => b.population - a.population);
      return {
        ...state,
        paises: sortedPaises,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
