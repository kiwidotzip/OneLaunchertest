import {
	CheckIcon,
	DotsVerticalIcon,
	EyeIcon,
	PlayIcon,
	PlusIcon,
	SearchMdIcon,
} from '@untitled-theme/icons-solid';
import type { Accessor, Setter } from 'solid-js';
import { For, Match, Switch, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import image from '../../assets/images/header.png';
import ContextMenu from '../components/overlay/ContextMenu';
import Button from '../components/base/Button';
import Tag from '../components/base/Tag';
import TextField from '../components/base/TextField';
import ClusterCover from '~ui/components/game/ClusterCover';
import type { Cluster } from '~bindings';
import useCommand from '~ui/hooks/useCommand';
import { bridge } from '~imports';
import { upperFirst } from '~utils/primitives';
import { useClusterModalController } from '~ui/components/overlay/cluster/ClusterCreationModal';

function HomePage() {
	const [clusters, { refetch }] = useCommand(bridge.commands.getClusters);
	const controller = useClusterModalController();

	async function newCluster() {
		controller.setVisible(true);
	}

	return (
		<div class="flex flex-col h-full gap-y-4 text-fg-primary">
			<Banner />

			<div class="flex flex-row justify-between items-center">
				<div>
					<TextField iconLeft={<SearchMdIcon />} placeholder="Search for clusters..." />
				</div>
				<div class="flex flex-row gap-x-4">
					<Button
						buttonStyle="primary"
						iconLeft={<PlusIcon class="!w-5 stroke-[2.2]" />}
						children="New Cluster"
						onClick={newCluster}
					/>
				</div>
			</div>

			<Switch>
				<Match when={clusters()?.length === 0}>
					<div class="flex flex-col flex-1 gap-y-4 max-h-64 justify-center items-center">
						<span class="text-lg font-bold uppercase text-fg-secondary">No clusters were found.</span>
						<span class="text-xl font-bold">Create one now with the New Cluster button.</span>
					</div>
				</Match>
				<Match when={clusters() !== undefined}>
					<ClusterGroup title="Clusters" clusters={clusters()!} />
				</Match>
			</Switch>
		</div>
	);
}

export default HomePage;

// TODO: Replace this into it's own component
// possibly with the core ui lirbary with autogenerated and optimized svgs pls
function OneConfigLogo() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="Group 3544">
				<g id="Group 3545">
					<path id="Secondary" d="M15.635 6.4514C15.6593 6.49541 15.6848 6.54148 15.7046 6.58943C16.1185 7.45825 16.1017 8.7122 15.6275 9.56181L13.9018 12.5487C13.3915 11.7689 12.6768 11.0998 11.8176 10.5943C11.8392 10.5607 11.8585 10.5269 11.8753 10.4933C13.3988 7.41013 11.8176 3.33781 8.0003 3.39798C4.11578 3.333 2.58014 7.47994 4.17113 10.604C3.31664 11.1094 2.6067 11.7761 2.09878 12.5535C2.08691 12.5283 1.91791 12.2378 1.68616 11.8394C1.12277 10.8708 0.18813 9.26419 0.235961 9.27782C-0.0841643 8.50283 -0.0793459 7.4438 0.255235 6.67845C0.27533 6.62445 0.300245 6.57238 0.326452 6.52232C0.341024 6.49435 0.356067 6.46697 0.370757 6.44017L2.83046 2.1753C2.8341 2.17043 2.83716 2.1649 2.84021 2.15944C2.84327 2.15409 2.84621 2.1488 2.84973 2.14404C3.35754 1.29925 4.5586 0.613281 5.53813 0.613281H10.4576C11.5744 0.613281 12.607 1.21017 13.163 2.1753C13.1686 2.18241 14.024 3.66317 14.7254 4.87721C15.2115 5.7186 15.6235 6.43183 15.6275 6.43777L15.635 6.4514Z" fill="#DFEAFF" fill-opacity="0.5" />
					<g id="Primary">
						<path d="M5.73802 12.1854C7.03039 12.9171 8.98957 12.9147 10.2532 12.1806C11.3314 12.7149 12.1161 13.6247 12.3591 14.6933C11.8272 15.0856 11.1725 15.3527 10.5804 15.3816C10.542 15.3865 10.4987 15.3865 10.4601 15.3865C10.4265 15.3856 9.7571 15.386 8.9193 15.3865H8.87546C7.43983 15.3874 5.53976 15.3886 5.47807 15.3841C4.87154 15.3696 4.1904 15.1 3.64404 14.6933C3.88237 13.6271 4.66459 12.7197 5.73802 12.1854Z" fill="#DFEAFF" fill-opacity="0.5" />
						<path d="M10.4314 8.0023C10.5156 11.3598 5.48535 11.3574 5.56961 8.0023C5.5239 4.62553 10.4747 4.62553 10.4314 8.0023Z" fill="#DFEAFF" fill-opacity="0.5" />
					</g>
				</g>
			</g>
		</svg>
	);
}

function Banner() {
	// TODO: Banner information
	/**
	 * If there are any clusters, display the most recent cluster name + some statistics as the "description".
	 * The background would prioritise
	 * any screenshots taken from the cluster, if there are none, it would display the cluster cover if it has been set.
	 * The button would launch the cluster.
	 *
	 * If there are no clusters, display a generic background with the button action creating a new cluster.
	 */
	return (
		<div class="relative w-full h-52">
			<img src={image} class="absolute rounded-xl w-full h-52 object-cover" />
			<div class="relative z-10 h-full px-8 py-6 text-fg-primary flex flex-col justify-between items-start">
				<div class="flex flex-col gap-y-2">
					<h1>Building worlds</h1>
					<p>A description would go here if I was smart</p>
				</div>
				<div class="flex w-full flex-row justify-between items-end">
					<div class="flex flex-row items-center gap-x-4">
						<Button
							buttonStyle="primary"
							iconLeft={<PlayIcon />}
							children="Launch 1.19.2"
						/>
						<Button
							buttonStyle="icon"
							children={<DotsVerticalIcon />}
						/>
					</div>
					<div class="flex flex-row gap-x-2">
						<Tag iconLeft={<OneConfigLogo />} />
						<Tag iconLeft={<CheckIcon />}>Verified</Tag>
					</div>
				</div>
			</div>
		</div>
	);
}

interface ClusterCardContextMenuProps {
	pos: Accessor<{ x: number; y: number }>;
	contextMenuVisible: Accessor<boolean>;
	setContextMenuVisible: Setter<boolean>;
	id: string;
}

function ClusterCardContextMenu(props: ClusterCardContextMenuProps) {
	const navigate = useNavigate();

	function viewCluster() {
		navigate(`/clusters/?id=${props.id}`);
	}

	return (
		<ContextMenu
			pos={props.pos}
			visible={props.contextMenuVisible}
			setVisible={props.setContextMenuVisible}
		>
			<ContextMenu.Row
				icon={<EyeIcon />}
				text="View"
				onClick={() => viewCluster()}
			/>

			<ContextMenu.Seperator />

			<ContextMenu.Row
				icon={<PlayIcon />}
				text="Launch"
				onClick={() => {}}
			/>
		</ContextMenu>
	);
}

function ClusterCard(props: Cluster) {
	const navigate = useNavigate();
	const [pos, setPos] = createSignal({ x: 0, y: 0 });
	const [contextMenuVisible, setContextMenuVisible] = createSignal(false);
	let ref!: HTMLDivElement;

	function openClusterPage(_e: MouseEvent) {
		navigate(`/clusters/?id=${props.uuid}`);
	}

	function openContextMenu(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		setContextMenuVisible(!contextMenuVisible());
	}

	function onMouseDown(e: MouseEvent) {
		setPos({ x: e.clientX, y: e.clientY });
	}

	return (
		<>
			<div
				onClick={e => openClusterPage(e)}
				onMouseDown={e => onMouseDown(e)}
				onContextMenu={e => openContextMenu(e)}
				ref={ref}
				class="relative h-[152px] group flex flex-col rounded-xl bg-component-bg hover:bg-component-bg-hover active:bg-component-bg-pressed border border-gray-05"
			>
				<div class="flex-1 relative overflow-hidden rounded-t-xl">
					<div
						class="absolute h-full w-full group-hover:!scale-110 transition-transform"
						style={{ '-webkit-transform': 'translateZ(0)' }}
					>
						<ClusterCover
							cluster={props}
							class="object-cover h-full w-full"
						/>
					</div>
				</div>
				<div class="z-10 p-3 flex flex-row items-center justify-between">
					<div class="flex flex-col gap-1.5">
						<p class="h-4 font-medium">{props.meta.name}</p>
						<p class="h-4 text-xs">
							{upperFirst(props.meta.loader)}
							{' '}
							{props.meta.mc_version}
							{/* {' '}
							{props.instance.mods && `• ${props.mods} mods`} */}
						</p>
					</div>
					<Button onClick={e => openContextMenu(e)} buttonStyle="icon" class="w-8 h-8">
						<DotsVerticalIcon />
					</Button>
				</div>
			</div>

			<ClusterCardContextMenu
				contextMenuVisible={contextMenuVisible}
				setContextMenuVisible={setContextMenuVisible}
				pos={pos}
				id={props.uuid}
			/>
		</>
	);
}

interface ClusterGroupProps {
	title: string;
	clusters: Cluster[];
}

function ClusterGroup(props: ClusterGroupProps) {
	return (
		<div class="flex flex-col gap-y-4">
			<h4>{props.title}</h4>
			<div class="grid grid-cols-4 2xl:grid-cols-6 gap-4">
				<For each={props.clusters}>{item => <ClusterCard {...item} />}</For>
			</div>
		</div>
	);
}
