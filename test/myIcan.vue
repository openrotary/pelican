<template>
    <section :class="['xxgft']">
        <SHeader title="房屋验收">
            <span :class="['xoyfz']"
                >筛选筛选筛选筛选筛选筛选筛选筛选筛选筛选筛选筛选筛选筛选</span
            >
        </SHeader>
        <li
            :class="['jcche', { active: isActive }]"
            :key="$_i"
            v-for="($it, $_i) in list"
        >
            有氧
        </li>
    </section>
</template>
<script></script>
<style lang="stylus" scoped>
 .xxgft {
	width: 100vw;
	display: flex;
	flex-direction: column;

	.xoyfz {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		color: #fff;
		background-color: #AE9575;
	}

	.jcche {
		list-style: none;
		font-style: normal;
		box-sizing: border-box;
		padding: 0 15px;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #fff;
		margin-bottom: 10px;
		height: 90px;
		color: green;

		.zrqyd {
			color: #424242;
			font-size: 15px;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;

			&.newSelect {
				&.newSelect {
				}
			}
		}

		.ahcgd {
			font-size: 12px;
			color: #757575;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			background-color: #F5F5F5;
			border-radius: 5px;
			padding: 3px 5px;

			&.newSelect {
			}

			&.newSelect {
			}
		}
	}
}
</style>
