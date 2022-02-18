/**
 *
 * @param player_answers: answers that the player has selected
 * @param multiple_correct_answers
 * @param correct_answers
 * @returns
 */
export function isCorrect(
  player_answers: boolean[],
  multiple_correct_answers: boolean,
  correct_answers: boolean[]
): boolean | boolean[] {
  if (player_answers === correct_answers) return true;
  if (multiple_correct_answers) {
    return player_answers.map(function (a, i) {
      return a === correct_answers[i];
    });
  }
  return false;
}
