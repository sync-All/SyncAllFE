const axios = require('axios')

async function createFmtTable(){
    const tableSchema = {
        description: "A to-do list of places to visit",
        fields: [
          {
            "description": "Name of the apartment",
            "name": "project_title",
            "type": "singleLineText"
          },
          {
            "name": "genre",
            "type": "multipleSelects"
          },
          {
            "name": "project_director",
            "type": "singleLineText"
          },
          {
            "name": "project_producer",
            "type": "singleLineText"
          },
          {
            "name": "project_cast",
            "type": "multipleSelects"
          },
          {
            "name": "production_budget",
            "type": "singleLineText"
          },
          {
            "name": "production_synopsis",
            "type": "multilineText"
          },
          {
            "name": "scene_synopsis",
            "type": "multilineText"
          },
          {
            "name": "distributor",
            "type": "singleLineText"
          },
          {
            "name": "distribution",
            "type": "multipleSelects"
          },
          {
            "name": "usage",
            "type": "multipleSelects"
          },
          {
            "name": "length",
            "type": "singleLineText"
          },
          {
            "name": "territories",
            "type": "multipleSelects"
          },
          {
            "name": "media",
            "type": "multipleSelects"
          },
          {
            "name": "attachments",
            "type": "multipleSelects"
          },
          {
            "name": "license_duration",
            "type": "singleLineText"
          },
          {
            "name": "additional_info",
            "type": "singleLineText"
          },
          
        ],
        "name": "Film/Movies/Tv series"
      }
}