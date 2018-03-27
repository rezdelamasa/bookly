// $('.nav li a').on('click', function() {
// 	$('.nav li a').removeClass('active');
// 	$(this).addClass('active');
// 	console.log('click');
// 	$('#bookmark-folder-type').text($(this).text());
// 	console.log('click');
// });

(function() {
	var app = angular.module('bookly', [ ]);

	app.controller('BookmarkController', function($scope) {

		$scope.categories = ['News', 'Technology', 'Sports', 'Funny', 'Web Dev'];

		$scope.bookmarks = [
			{
				title: 'Twenty-Two Attorneys General Sue The FCC Over Net Neutrality Repeal',
				link: 'https://psmag.com/news/22-attorneys-general-sue-fcc-over-net-neutrality-repeal',
				folder: 'News',
				favorite: false
			},
			{
				title: "Chrissy Teigen Boldly Offers to Pay Olympic Gymnast McKayla Maroney's 100k Fine If She Speaks at Larry Nasser Hearing",
				link: 'https://www.billboard.com/articles/news/8094407/chrissy-teigen-mckayla-maroney-fine-olympic-trial',
				folder: 'News',
				favorite: false
			},
			{
				title: "I'm a freelance web dev and my current client's IT team has blocked github as a \"social networking\" site. What other stupid things have your clients done?",
				link: 'https://www.reddit.com/r/webdev/comments/7pxeqn/im_a_freelance_web_dev_and_my_current_clients_it/',
				folder: 'Web Dev',
				favorite: false
			},
			{
				title: 'Flexbox vs CSS Grid',
				link: 'https://youtu.be/O7P3ps-7OGY',
				folder: 'Web Dev',
				favorite: false
			}, 
			{
				title: '2018\'s Web Developer\'s Roadmap - This thing is brilliant!',
				link: 'https://github.com/kamranahmedse/developer-roadmap',
				folder: 'Web Dev',
				favorite: false
			},
			{
				title: 'My cab driver tonight was so excited to share with me that he\’d made the cover of the calendar. I told him I\’d help let the world see.',
				link: 'https://www.reddit.com/r/funny/comments/7mjw12/my_cab_driver_tonight_was_so_excited_to_share/',
				folder: 'Funny',
				favorite: false
			},
			{
				title: 'Miami\'s Alternate Jersey',
				link: 'https://i.imgur.com/tTQvc4q.jpg',
				folder: 'Sports',
				favorite: false
			},
			{
				title: '[Wright] Spurs coach Gregg Popovich was asked why he thinks it\’s important to give back to the community: “Because we\’re rich as hell and we don\’t need it all, and other people need it. Then, you\’re an ass if you don\’t give it. Pretty simple.”',
				link: 'https://twitter.com/mikecwright/status/945807078026825728',
				folder: 'Sports',
				favorite: false
			},
			{
				title: 'Massive Fraud in Net Neutrality Process is a Crime Deserving of Justice Department Attention',
				link: 'https://townhall.com/columnists/bobbarr/2017/12/20/massive-fraud-in-net-neutrality-process-is-a-crime-deserving-of-justice-department-attention-n2424724',
				folder: 'Technology',
				favorite: false
			}
		];



		$scope.activeFolder = 'All';

		$scope.setActive = function(c) {
			$scope.activeFolder = c;
		}

		$scope.showAll = true;

		$scope.setAll = function() {
			$scope.activeFolder = 'All';
		}

		$scope.showSettings = false;
		$scope.allOrSettings = 'All'

		$scope.toggleSettings = function() {
			$scope.showSettings = !$scope.showSettings;
			if($scope.showSettings) {
				$scope.allOrSettings = 'Settings';
			} else {
				$scope.allOrSettings = 'All';
			}
		}

		$scope.showFolderEditor = false;

		$scope.toggleFolderEditor = function() {
			$scope.showFolderEditor = !$scope.showFolderEditor;
		}

		$scope.showDeletePrompt = false;

		$scope.toggleDeletePrompt = function() {
			$scope.showDeletePrompt = !$scope.showDeletePrompt;
			console.log('hello');
		}

		$scope.deleteFolder = function(i) {
			$scope.categories.splice(i, 1);
			if($scope.categories[0]) {
				$scope.activeFolder = $scope.categories[0];
			} else {
				$scope.activeFolder = 'All';
			}
		}

		$scope.showEditor = false;
		$scope.editorIndex;

		$scope.toggleEditor = function(i) {
			if($scope.showSettings) {
				$scope.showEditor = !$scope.showEditor;
				$scope.editorIndex = i;
			}
		}

		$scope.hideEditor = function() {
			if($scope.showSettings) {
				$scope.showEditor = !$scope.showEditor;
				$scope.editorIndex = -1;
			}
		}



		$scope.toggleNewFolder = function() {

		}

		$scope.user = {
		    name: 'awesome user'
		}; 

		$scope.submit = function() {
			if($scope.text) {
				if($scope.categories.indexOf($scope.text) < 0) {
					$scope.categories.push(capitalizeFirstLetter(this.text));
					$scope.text = '';
				} else {
					alert('This folder already exists.');
				}
			}
		}

		function capitalizeFirstLetter(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}

		$scope.showNew = false;
		$scope.menuSymbol = '+';

		$scope.toggleNew = function() {
			$scope.showNew = !$scope.showNew;
			if($scope.menuSymbol == '+') {
				$scope.menuSymbol = '-';
			} else {
				$scope.menuSymbol = '+';
			}
		}

		$scope.newFolder = 'Folder';

		$scope.addBookmark = function() {
			var newObj = {

			};

			newObj.title = $scope.newTitle;
			newObj.link = $scope.newLink;
			if($scope.categories.indexOf($scope.newFolder) >= 0) {
				newObj.folder = $scope.newFolder;
				$scope.bookmarks.push(newObj);
				$scope.newTitle = '';
				$scope.newLink = '';
				$scope.newFolder = '';
				$scope.newFolder = 'Folder';
				$scope.toggleNew();
			} else {
				newObj.title = $scope.newTitle;
				newObj.link = $scope.newLink;	
				$scope.newFolder = 'You may only use an existing folder, or create a new one.';
				$scope.newFolder = '';
			}
		}

		$scope.showNameEditor = false;
		$scope.oldName = '';

		$scope.toggleNameEditor = function(i) {
			if($scope.showSettings) {
				$scope.showNameEditor = !$scope.showNameEditor;
				$scope.oldName = $scope.activeFolder;

			}
		}

		$scope.changeName = function(n) {
			var index = $scope.categories.indexOf($scope.oldName);
			$scope.categories[index] = n;
			$scope.activeFolder = $scope.categories[index];
			angular.forEach($scope.bookmarks, function(b) {
				if(b.folder == $scope.oldName) {
					b.folder = n;
				}
			});
			$scope.showNameEditor = !$scope.showNameEditor;
		}

		$scope.toggleFavorites = function() {
			$scope.activeFolder = 'Favorites';
		}

		$scope.favorite = function(i) {
			console.log(i);
			console.log($scope.bookmarks[i].favorite);
			$scope.bookmarks[i].favorite = !$scope.bookmarks[i].favorite;
			console.log($scope.bookmarks[i].favorite);
			
		}

		$scope.isActiveFolder = function(i) {
			if($scope.activeFolder == 'All' || $scope.bookmarks[i].folder == $scope.activeFolder || ($scope.bookmarks[i].favorite && $scope.activeFolder == 'Favorites')) {
				return true;
			}
		}

		$scope.deleteBookmark = function(i) {
			$scope.bookmarks.splice(i, 1);
		}

		$scope.editing = -1;

		$scope.toggleEditing = function(i) {
			console.log(i);
			if($scope.editing == -1) {
				$scope.editing = i;
			} else if($scope.editing != i) {
				$scope.editing = i;
			} else if($scope.editing == i) {
				$scope.editing = -1;
			}
		}

		$scope.updateBookmark = function(i, g) {
			if($scope.categories.indexOf(g) < 0) {
				$scope.categories.push(g);
			}
			$scope.editing = -1;
		}


	});
})();