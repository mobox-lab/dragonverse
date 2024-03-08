export const Behavior3_normalGhost = {
  "name": "normalGhost",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Sequence",
        "args": {},
        "children": [
          {
            "id": 3,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 4,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 5,
            "name": "Selector",
            "children": [
              {
                "id": 6,
                "name": "Sequence",
                "children": [
                  {
                    "id": 7,
                    "name": "GhostCheckTarget",
                    "args": {},
                    "input": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 8,
                    "name": "GhostClearTarget"
                  }
                ]
              },
              {
                "id": 9,
                "name": "GhostChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 10,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 11,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 12,
                "name": "FallBack",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 13,
                    "name": "GhostSightCheckNode",
                    "args": {},
                    "output": [
                      "targetId"
                    ],
                    "debug": true
                  }
                ]
              },
              {
                "id": 14,
                "name": "GhostStartChaseTarget",
                "args": {},
                "input": [
                  "targetId"
                ],
                "debug": true,
                "children": []
              }
            ]
          },
          {
            "id": 15,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 16,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 17,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 18,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 19,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 20,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 21,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 22,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 23,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 24,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 25,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 26,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 27,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 28,
                    "name": "GhostRandomPartol",
                    "args": {}
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}