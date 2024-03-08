export const Behavior3_triggerGhost = {
  "name": "triggerGhost",
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
        "children": [
          {
            "id": 5,
            "name": "GhostCheckStat",
            "args": {
              "stat": "Chasing"
            },
            "children": []
          },
          {
            "id": 6,
            "name": "GhostTargetId",
            "args": {},
            "output": [
              "targetId"
            ]
          },
          {
            "id": 7,
            "name": "Selector",
            "children": [
              {
                "id": 8,
                "name": "Sequence",
                "args": {},
                "children": [
                  {
                    "id": 9,
                    "name": "GhostTriggerGet",
                    "args": {
                      "guid": "triggerGuid"
                    },
                    "output": [
                      "triPlayerId"
                    ]
                  },
                  {
                    "id": 10,
                    "name": "Not",
                    "children": [
                      {
                        "id": 11,
                        "name": "Cmp2Val",
                        "args": {},
                        "input": [
                          "targetId",
                          "triPlayerId"
                        ]
                      }
                    ]
                  },
                  {
                    "id": 12,
                    "name": "GhostClearTarget",
                    "children": []
                  }
                ]
              },
              {
                "id": 13,
                "name": "Sequence",
                "children": [
                  {
                    "id": 14,
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
                    "id": 15,
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
                "id": 16,
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
        "id": 17,
        "name": "Selector",
        "desc": "休闲分支",
        "args": {},
        "children": [
          {
            "id": 18,
            "name": "Sequence",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 19,
                "name": "Sequence",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 20,
                    "name": "GhostTriggerGet",
                    "args": {
                      "guid": "triggerGuid"
                    },
                    "output": [
                      "targetId"
                    ]
                  },
                  {
                    "id": 21,
                    "name": "CheckPlayerId",
                    "args": {},
                    "input": [
                      "targetId"
                    ]
                  }
                ]
              },
              {
                "id": 22,
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
            "id": 23,
            "name": "Sequence",
            "desc": "1",
            "args": {},
            "debug": true,
            "children": [
              {
                "id": 24,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 25,
                    "name": "GhostIsMoving",
                    "args": {}
                  }
                ]
              },
              {
                "id": 26,
                "name": "Not",
                "args": {},
                "children": [
                  {
                    "id": 27,
                    "name": "GhostCheckStat",
                    "args": {
                      "stat": "patrolStat"
                    }
                  }
                ]
              },
              {
                "id": 28,
                "name": "Selector",
                "args": {},
                "debug": true,
                "children": [
                  {
                    "id": 29,
                    "name": "Sequence",
                    "args": {},
                    "children": [
                      {
                        "id": 30,
                        "name": "GhostCheckStat",
                        "args": {
                          "stat": "patrolFinish"
                        }
                      },
                      {
                        "id": 31,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0.1
                        }
                      },
                      {
                        "id": 32,
                        "name": "GhostPlayPatrolAni",
                        "args": {
                          "keepTime": 4
                        }
                      }
                    ]
                  },
                  {
                    "id": 33,
                    "name": "Sequence",
                    "children": [
                      {
                        "id": 34,
                        "name": "RandomPasser",
                        "args": {
                          "passRate": 0
                        }
                      },
                      {
                        "id": 35,
                        "name": "GhostRandomFindPlayer",
                        "args": {
                          "keepTime": 4
                        },
                        "debug": true
                      }
                    ]
                  },
                  {
                    "id": 36,
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