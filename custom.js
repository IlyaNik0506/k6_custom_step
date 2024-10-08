// Предположим, что MIG_1 и MIG_2 - это функции, которые вы хотите выполнить в рамках каждого сценария
import MIG_1 from './mig_1.js';
import MIG_2 from './mig_2.js';

const preAllocatedVUs = 1;
const maxVUs = 2200;

// Функция для генерации стадий с учетом специфического графика изменения RPS
const getCustomStages_MIG_1 = () => {
    return [
        { target: 10, duration: '3h'}, // 10 RPS в течение первых трех часов
        { target: 150, duration: '30s'}, // Увеличение до 150 RPS за 30 секунд
        { target: 150, duration: '55m30s'}, // Поддержание 150 RPS до конца пятого часа
        { target: 10, duration: '18h24m30s'} // Снижение до 10 RPS и поддержание до конца теста
    ];
};


const getCustomStages_MIG_2 = () => {
    return [
        { target: 10, duration: '3h'}, // 10 RPS в течение первых трех часов
        { target: 150, duration: '30s'}, // Увеличение до 150 RPS за 30 секунд
        { target: 150, duration: '55m30s'}, // Поддержание 150 RPS до конца пятого часа
        { target: 10, duration: '18h24m30s'} // Снижение до 10 RPS и поддержание до конца теста
    ];
};


export const options = {
    scenarios: {
        MIG_1: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs,
            maxVUs,
            timeUnit: '1s',
            gracefulStop: '10s',
            startRate: 10, // Начальная скорость для MIG_1
            stages: getCustomStages_MIG_1(),
            exec: 'MIG_1_exec'
        },
        MIG_2: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs,
            maxVUs,
            timeUnit: '1s',
            gracefulStop: '10s',
            startRate: 10, // Начальная скорость для MIG_2
            stages: getCustomStages_MIG_2(),
            exec: 'MIG_2_exec'
        },
    }
};

export function MIG_1_exec() {
    MIG_1(); // Выполнение функции MIG_1 в рамках сценария MIG_1
}

export function MIG_2_exec() {
    MIG_2(); // Выполнение функции MIG_2 в рамках сценария MIG_2
}
