import axios from "axios";

const GET_PAISES = "GET_PAISES";
const GET_DETAIL = "GET_PAIS";
const GET_NAME = "GET_NAME";
const POST_ACT = "POST_ACT";
const SORT_CONTINENT = "SORT_CONTINENT";
const SORT_ACTIVITY = "SORT_ACTIVITY";
const GET_ACTIVITIES = "GET_ACTIVITIES";
const RESET_FILTERS = "RESET_FILTERS";

const getPaises = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/countries");
    const paises = apiData.data.map((pais) => {
      return {
        ...pais,
        activities: [],
      };
    });

    dispatch({
      type: GET_PAISES,
      payload: paises,
    });
  };
};

const getPaisById = (id) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/countries/${id}`);

    const pais = apiData.data;
    dispatch({
      type: GET_DETAIL,
      payload: pais,
    });
  };
};

export function getName(name) {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );

      dispatch({
        type: GET_NAME,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const getActivities = () => async (dispatch) => {
  try {
    let activities = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: activities.data,
    });
  } catch (error) {
    console.log(`${error.name}:${error.message}`);
  }
};

const postActivity = (form) => {
  return async function () {
    try {
      const newActivity = await axios.post(
        "http://localhost:3001/activities",
        form
      );
      console.log(newActivity);
    } catch (error) {
      console.log(error);
    }
  };
};

function orderAsc(payload) {
  return {
    type: "ORDER_ASC",
    payload: payload,
  };
}

function orderDesc(payload) {
  return {
    type: "ORDER_DESC",
    payload: payload,
  };
}

function populationAsc(payload) {
  return {
    type: "POPULATION_ASC",
    payload: payload,
  };
}

function populationDesc(payload) {
  return {
    type: "POPULATION_DESC",
    payload: payload,
  };
}

function sortContinent(payload) {
  return (dispatch) => {
    return dispatch({
      type: SORT_CONTINENT,
      payload,
    });
  };
}

const sortActivity = (payload) => {
  return {
    type: SORT_ACTIVITY,
    payload: payload,
  };
};

const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export {
  GET_PAISES,
  GET_DETAIL,
  POST_ACT,
  GET_NAME,
  GET_ACTIVITIES,
  SORT_CONTINENT,
  SORT_ACTIVITY,
  RESET_FILTERS,
  populationAsc,
  populationDesc,
  orderAsc,
  orderDesc,
  resetFilters,
  getActivities,
  sortActivity,
  sortContinent,
  getPaises,
  getPaisById,
  postActivity,
};
