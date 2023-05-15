import Pocketbase from 'pocketbase';
import type { Entry } from '$lib/types';

export const _pb = new Pocketbase('http://127.0.0.1:8090');

export const _formatDate = (timestamp: Date) => {
	return timestamp.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		month: 'numeric',
		day: 'numeric',
		year: 'numeric'
	});
};

export async function _saveEntry(owner: string, text: string, tags?: string[]) {
	const data = {
		entry_owner: owner,
		entry_text: text,
		entry_tags: JSON.stringify(tags) // convert array to JSON string
	};

	try {
		await _pb.collection('entries').create(data);
	} catch (error) {
		return 'NOT OK';
	}

	return 'OK';
}

export async function _deleteEntry(id: string) {
	try {
		await _pb.collection('entries').delete(id);
	} catch (error) {
		return 'NOT OK';
	}

	return 'OK';
}

export async function _showTag(tags: string[]) {
	const response = {
		status: '',
		body: {}
	};

	const tagString = tags.map((tag) => `"${tag}"`).join(',');

	try {
		response.body = await _pb.collection('entries').getFullList({
			filter: `entry_tags ~ ${tagString}`
		});
	} catch (error) {
		response.status = 'NOT OKAY';
		return response;
	}

	response.status = 'OK';
	return response;
}

export async function load() {
	const entries: Entry[] = await _pb.collection('entries').getFullList({
		sort: '-created'
	});

	return {
		status: 200,
		body: {
			entries
		}
	};
}
