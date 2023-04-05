const express = require('express')
const{
    createGoal,
    getGoals,
    // getOwnGoals,
    updateGoal,
    deleteGoal,
} = require('../controllers/goal_controller')
const requireAutho = require('../util/auth');
const router = express.Router()
router.use(requireAutho)
//get all goals
router.get('/',getGoals)
//get own all goals
// router.get('/mygoals', getOwnGoals)
//create goals
router.post('/', createGoal)
//update goal
router.put('/:id', updateGoal)
//delete goal
router.delete('/:id', deleteGoal)

module.exports = router