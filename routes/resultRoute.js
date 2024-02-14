const express = require("express");
const router = express.Router();

const XLSX = require("xlsx")
const RESULT_FILE_NAME = 'results.xlsx'
const LEADERBOARD_SHEET_NAME = 'LEADERBOARD'

const wb = XLSX.readFile(RESULT_FILE_NAME)

router.post("/", (req, res) => {
  try {
    const result = req.body
    // console.log(result);
    const leaderSheet = wb.Sheets[LEADERBOARD_SHEET_NAME]
    const newSheetName = result.user.toUpperCase()
    let totalMarks = 0, attemptedCount = 0, correctCount = 0, incorrectCount = 0, unattemptedCount = 0;
    const questionSet = [...result.attempted, ...result.unattempted].sort((a, b) => a.sl_no - b.sl_no).map(ques => {
      const isAttempted = ques?.chosenAns
      const isCorrect = ques?.chosenAns === ques?.answer
      if(isAttempted) {
        attemptedCount += 1
        if(isCorrect) {
          correctCount += 1
          totalMarks += 2
        }
        else {
          incorrectCount += 1
          totalMarks -= 1
        }
      }
      else {
        unattemptedCount += 1
      }
      return {
        sl_no: ques.sl_no,
        questionId: ques._id,
        option1: ques.options[0],
        option2: ques.options[1],
        option3: ques.options[2],
        option4: ques.options[3],
        correct_option: ques.answer,
        chosen_option: ques?.chosenAns,
        status: isAttempted ? (isCorrect ? 'Attempted/Correct' : 'Attempeted/Wrong') : 'Unattempted',
        marks: isAttempted ? (isCorrect ? 2 : -1) : 0
      }
    })
    const newLeaderData = [
      [result.user, attemptedCount, correctCount, incorrectCount, unattemptedCount, totalMarks, result.timeTaken]
    ]
    const range = XLSX.utils.decode_range(leaderSheet['!ref'])
    const newRowStart = range.e.r + 1

    const newLeaderSheetData = XLSX.utils.aoa_to_sheet(newLeaderData, {origin: newRowStart} )
    Object.assign(leaderSheet, newLeaderSheetData)
    console.log(questionSet, newLeaderData);
    const ws = XLSX.utils.json_to_sheet(questionSet)
    XLSX.utils.book_append_sheet(wb, ws, newSheetName)
    XLSX.writeFile(wb, RESULT_FILE_NAME)
    res.status(201).json({
        status: 200,
        msg: "Success"
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error", err });
  }
});

module.exports = router;
