const { createApp } = Vue

createApp({
    data() {
        return {
            inputs: Array(10).fill(0).map((_, i) => i),
            numbers: Array(4).fill(null).map((_, i) => ({
                value: '',
                selected: i == 0,
            })),
            history: [],
            target: Array(4).fill(null),
        }
    },
    methods: {
        input(number) {
            let index = this.selectedNumberIndex
            this.numbers.forEach(n => {
                if (n.selected) {
                    n.value = number
                } else if (n.value === number) {
                    n.value = ''
                }
            })
            let emptyIndexes = this.numbers.map((n, i) => ({
                empty: n.value === '',
                index: i,
            })).filter(e => e.empty)
            var nextIndex = emptyIndexes.find(e => e.index > index)
            if (!nextIndex && emptyIndexes.length > 0) {
                nextIndex = emptyIndexes[0]
            }
            if (nextIndex) {
                this.selectNumber(nextIndex.index)
            } else {
                this.selectNumber((index + 1) % 4)
            }
        },

        selectNumber(index) {
            this.numbers.map((n, i) => {
                n.selected = i == index
            })
        },

        submitGuess() {
            this.history.push({
                number: this.numbers.map(n => n.value),
                result: this.getCompareResult()
            })
        },

        getCompareResult() {
            var a = 0
            var b = 0
            this.numbers.forEach((n, i) => {
                this.target.forEach((t, j) => {
                    if (n.value === t) {
                        if (i === j) {
                            a++
                        } else {
                            b++
                        }
                    }
                })
            })
            return {a, b}
        },

        generateTarget() {
            let candidates = this.inputs.slice()
            this.target = this.target.map(() => candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0])
            console.log(this.target)
        },
    },
    computed: {
        selectedNumberIndex() {
            return this.numbers.findIndex(n => n.selected)
        },
        allNumbersSet() {
            return this.numbers.every(n => n.value !== '')
        },
    },

    mounted() {
        this.generateTarget()
    },
}).mount('#app')