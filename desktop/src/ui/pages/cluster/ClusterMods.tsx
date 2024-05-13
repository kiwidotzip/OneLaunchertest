import { open } from '@tauri-apps/plugin-shell';
import { ArrowRightIcon, Edit02Icon, LinkExternal01Icon, Trash03Icon } from '@untitled-theme/icons-solid';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-solid';
import { For, Show } from 'solid-js';
import * as uuid from 'uuid';
import Button from '~ui/components/base/Button';

const mods = Array<ModEntryProps>(15).fill({
	id: uuid.v4(),
	name: 'Mod Name',
	author: 'Author Name',
	version: '1.0.0',
	description: 'This is a mod description',
	provider: 'curseforge',
	thumbnail: 'https://cdn.modrinth.com/data/AANobbMI/icon.png',
});

function ClusterMods() {
	return (
		<div class="flex flex-col flex-1">
			<h1>Mods</h1>
			<div class="flex flex-col flex-1 rounded-lg overflow-hidden w-[calc(100%+14px)]">
				<OverlayScrollbarsComponent class="os-hide-horizontal-scrollbar relative flex-1">
					<div class="flex flex-col absolute w-[calc(100%-14px)] gap-2">
						<For each={mods}>
							{mod => (
								<ModEntry {...mod} />
							)}
						</For>
					</div>
				</OverlayScrollbarsComponent>
			</div>
		</div>
	);
}

export default ClusterMods;

// TODO: Mod
interface ModEntryProps {
	id: string;
	thumbnail: string;
	name: string;
	author: string;
	version: string;
	description: string;
	provider: 'curseforge' | 'modrinth' | 'polyfrost';
};

function ModEntry(props: ModEntryProps) {
	return (
		<div class="bg-component-bg hover:bg-component-bg-hover active:bg-component-bg-pressed p-3 gap-3 rounded-xl flex flex-row items-center">
			<div>
				<img src={props.thumbnail} alt={props.name} class="aspect-ratio-square h-10 rounded-lg" />
			</div>
			<div class="flex flex-col flex-1">
				<div class="flex flex-row justify-between items-center">
					<div class="flex flex-col items-start justify-center">
						<div class="flex flex-row items-center">
							<h3>{props.name}</h3>
							<span class="flex flex-row items-center text-sm font-600 text-fg-secondary/50 ml-2">
								{props.version}
								{/* TODO: Add version checker */}
								{/* <Show when={props.version.includes()}> */}
								<ArrowRightIcon class="w-4 stroke-success" />
								<span class="text-success">1.0.1</span>
								{/* </Show> */}
							</span>
						</div>

						<span class="flex flex-row text-xs -mb-1 gap-1 items-center text-fg-secondary opacity-50">
							by
							{/* TODO: Implement prompt */}
							<a onClick={() => open('https://google.com/')} class="text-fg-primary hover:opacity-70 flex flex-row gap-1 items-center">
								{props.author}
								<LinkExternal01Icon class="w-3" />
							</a>
						</span>
					</div>

					<div class="flex flex-row gap-2 items-end justify-center">
						<Button buttonStyle="iconSecondary">
							<Edit02Icon />
						</Button>

						<Button buttonStyle="iconSecondary">
							<Trash03Icon class="!stroke-danger" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
