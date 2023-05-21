# Faceted Search

Client-side faceted search
using [React](https://github.com/facebook/react), [Material UI](https://github.com/mui/material-ui)
and [React-Material-Table](https://github.com/KevinVandy/material-react-table).

Inspired by [ZIM Faceted Search](https://gams.uni-graz.at/webapps/drilldown/#/%2Frta1576%2Fjs%2Frta1576.json).

#### Input

accepts data in the format:

```json
{
  "gui": "appTitle",
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
        "value": "value6",
        "date": {
          "startDate": "2022",
          "endDate": "2022"
        }
      },
      {
        "txt": "value7",
        "value": "value8",
        "date": {
          "startDate": "2022",
          "endDate": "2022"
        }
      }
    ]
  }
}
```
