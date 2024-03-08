export const Behavior3_meleeBuildGhost = {
  "name": "meleeBuildGhost",
  "root": {
    "id": 1,
    "name": "Selector",
    "desc": "新行为树",
    "args": {},
    "children": [
      {
        "id": 2,
        "name": "Sequence",
        "children": [
          {
            "id": 3,
            "name": "GhostCheckStat",
            "args": {
              "stat": "PlayMelee"
            }
          }
        ]
      },
      {
        "id": 4,
        "name": "Sequence",
        "args": {},
        "debug": true,
        "children": [
          {
            "id": 5,
            "name": "GhostCheckBuild",
            "args": {},
            "output": [
              "buildId"
            ],
            "debug": true
          },
          {
            "id": 6,
            "name": "AlwaysSuccess",
            "children": [
              {
                "id": 7,
                "name": "GhostCheckAttackNode",
                "args": {},
                "input": [
                  "buildId"
                ],
                "output": [
                  "skillid"
                ],
                "debug": true
              }
            ]
          },
          {
            "id": 8,
            "name": "GhostAttackTarget",
            "args": {},
            "input": [
              "skillid",
              "buildId"
            ],
            "debug": true
          }
        ]
      },
      {
        "id": 9,
        "name": "Sequence",
        "args": {},
        "children": [
          {
            "id": 10,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 11,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 12,
            "name": "Selector",
            "children": [
              {
                "id": 13,
                "name": "Sequence",
                "children": [
                  {
                    "id": 14,
                    "name": "GhostCheckTarget",
                    "args": {},
                    "input": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 15,
                    "name": "GhostClearTarget"
                  }
                ]
              },
              {
                "id": 16,
                "name": "Sequence",
                "children": [
                  {
                    "id": 17,
                    "name": "GhostCheckAttackNode",
                    "args": {},
                    "input": [
                      "targetId"
                    ],
                    "output": [
                      "validSkill"
                    ]
                  },
                  {
                    "id": 18,
                    "name": "GhostAttackTarget",
                    "args": {},
                    "input": [
                      "validSkill",
                      "targetId"
                    ]
                  }
                ]
              },
              {
                "id": 19,
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
        "id": 20,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 21,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 22,
                "name": "FallBack",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 23,
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
                "id": 24,
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
            "id": 25,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 26,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 27,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 28,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 29,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 30,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 31,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 32,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 33,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 34,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 35,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 36,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 37,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 38,
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