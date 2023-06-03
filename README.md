# Faceted Search

Client-side dynamic data filtering and visualization application
using [React](https://github.com/facebook/react), [Material UI](https://github.com/mui/material-ui)
and [React-Material-Table](https://github.com/KevinVandy/material-react-table).
It allows users to filter through a set of data using various attributes (facets).

Inspired by [ZIM Faceted Search](https://gams.uni-graz.at/webapps/drilldown/#/%2Frta1576%2Fjs%2Frta1576.json).

[Demo](https://flamminger.github.io/facetedsearch/)

#### Input

Data can be fetched by providing a hashed URL to a JSON file in the URL query parameter `dataUrl`.
Preselected Tags can be provided in the URL query parameter `tags`, multiple tags can be passed, but they have
to be seperated with an `|` operator.

accepts data in the format:

```json
{
  "gui": {
    "appTitle": "App Title"
  },
  "data": {
    "facetConstraintMap": {
      "facet1": [
        "value1",
        "value2"
      ],
      "facet2": [
        "value3",
        "value4"
      ]
    },
    "data": [
      {
        "txt": "value5",
        "value": "url1",
        "date": {
          "startDate": "2022-01-01",
          "endDate": "2022-01-31"
        }
      },
      {
        "txt": "value7",
        "value": "url2",
        "date": {
          "startDate": "2022-02-01",
          "endDate": "2022-02-28"
        }
      }
    ]
  }
}
```

The data represents a list of items with various attributes. Each item has a textual description (txt) which is used as
title, a value (value) which points to an external resource, and an optional date range (startDate, endDate).

### Features

- Faceted filtering: Filter data items based on one or more facets.
- Dynamic Visualization: Reflects the changes in the data set in real-time as filters are applied.
