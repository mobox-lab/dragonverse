export const Behavior3_meleeGhostTest = {
  "name": "meleeGhostTest",
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
        "children": [
          {
            "id": 5,
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
            "id": 6,
            "name": "GhostAttackTarget",
            "args": {},
            "input": [
              "validSkill",
              "targetId"
            ]
          }
        ]
      }
    ]
  }
}