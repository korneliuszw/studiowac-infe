import {beforeEach, describe, expect, it} from "@jest/globals";
import {calculateSubjectPoints, calculationCache, getSubjectChance} from "@/utils/calculation";

describe("Calculation of scores for university", () => {
    beforeEach(() => {
        delete calculationCache[1]
    })
    it('getSubjectsChange should return nothing if below two min points', () => {
        expect(getSubjectChance(100, 120, 130)).toBeNull()
    })
    it('getSubjectsChange should return medium if more than previous min points and less than last known', () => {
        expect(getSubjectChance(135, 140, 130)).toBe("medium")
    })
    it('getSubjectsChange should return high if more than last min points', () => {
        expect(getSubjectChance(145, 140, 130)).toBe("high")
    })
    it('calculateSubjectPoints should cache formulas', () => {
        expect(calculationCache[1]).toBeUndefined()
        const result = calculateSubjectPoints(1, '1+1', {
            maths_primary: 98,
            maths_extended: 60,
            english_primary: 98,
            english_extended: 92,
            polish_primary: 60,
            polish_extended: 0,
            computerScience_extended: 90,
            physics_extended: 0,
            exams: {
                inf02_primary: 95,
                inf02_extended: 100,
                inf03_primary: 95,
                inf03_extended: 100
            }
        })
        expect(calculationCache[1]).toBeDefined()
    })
    it('calculateSubjectPoints should return correct value', () => {
        const formula = `0.5 * polish_primary + 0.5 * english_primary + 2.5 * (maths_primary + maths_extended) + max(2 * ((0.3 * inf02_primary +
            0.7 * inf02_extended) + (0.3 * inf03_primary + 0.7 * inf03_extended)), 2 * ((selection_extended > 29 ? (0.5 *
            selection_extended + 50) :  (2 * selection_extended)) + selection_extended))`
        const result = calculateSubjectPoints(1, formula, {
            maths_primary: 98,
            maths_extended: 60,
            english_primary: 98,
            english_extended: 92,
            polish_primary: 60,
            polish_extended: 0,
            computerScience_extended: 90,
            physics_extended: 0,
            exams: {
                inf02_primary: 95,
                inf02_extended: 100,
                inf03_primary: 95,
                inf03_extended: 100
            }
        })
        expect(result).toEqual(868)
    })
    it('calculateSubjectPoints should throw error if formula is wrong', () => {
        expect(() => calculateSubjectPoints(1, "test + 1", {
            maths_primary: 98,
            maths_extended: 60,
            english_primary: 98,
            english_extended: 92,
            polish_primary: 60,
            polish_extended: 0,
            computerScience_extended: 90,
            physics_extended: 0,
            exams: {
                inf02_primary: 95,
                inf02_extended: 100,
                inf03_primary: 95,
                inf03_extended: 100
            }
        })).toThrow()
    })
})