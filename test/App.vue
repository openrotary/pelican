<template>
    <section
        :class="['qbbkc', op, $op]"
        @click="handleClick"
        v-else
        v-for="($it, $_i) in list"
        :key="index"
    >
        <div :class="['cbsrm']">
            <div :class="['ehdhz']"></div>
            <header :class="['ebmjk']"></header>
        </div>
        <div :class="['eoeob']" :key="$_i" v-for="($it, $_i) in list">
            <header :class="['gfdkj']"></header>
        </div>
        <button :class="['zhxns']">
            <li :class="['nulvx']"></li>
            <span :class="['bbpoi']"></span>
        </button>
        <footer :class="['vpzci']"></footer>
    </section>
</template>
<script>
export default {
    naem: "App"
}
</script>
<style lang="stylus" scoped>
 .qbbkc {
	.cbsrm {
		.ehdhz {
		}

		.ebmjk {
		}
	}

	.eoeob {
		.gfdkj {
		}
	}

	.zhxns {
		.nulvx {
		}

		.bbpoi {
		}
	}

	.vpzci {
	}
}
</style>
