<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use GuzzleHttp\Client;
use OpenApi\Attributes as OA;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;


#[OA\Tag(name: 'Users')]
class UserController extends AbstractController
{
    public function __construct(TokenStorageInterface $tokenStorageInterface, JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    //Recuperer un Utilisateur en particulier
    /*#[Route('/users/{id}', name: 'one_user', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of a uwer',
        content: new Model(type: User::class)
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the user',
        schema: new OA\Schema(type: 'string')
    )]
    public function getOneUser(int $id, UserRepository $user_repo, SerializerInterface $serializer): JsonResponse
    {
        $user = $user_repo->find($id);

        if($user){
            $json_user = $serializer->serialize($user, 'json');
            return new JsonResponse($json_user, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }*/

    //Recuperer la liste des Utilisateurs
    #[Route('/api/users', name: 'users', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of s',
        content: new Model(type: User::class)
    )]
    public function getUserList(UserRepository $user_repo, SerializerInterface $serializer): JsonResponse
    {
        $user_list = $user_repo->findAll();
        $json_user_list = $serializer->serialize($user_list, 'json', (new ObjectNormalizerContextBuilder())
                ->withGroups('json')
                ->toArray());

        return new JsonResponse($json_user_list, Response::HTTP_OK, [], true);
    }

    //Connexion d'un Utilisateur
    #[Route('/api/me', name: 'me', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of the connected user',
        content: new Model(type: User::class)
    )]
    public function me(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UserRepository $user_repo): JsonResponse
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $email = $decodedJwtToken["username"];

        $user = $user_repo->findOneBy(array('mail' => $email));

        if($user){
            $json_user = $serializer->serialize($user, 'json', (new ObjectNormalizerContextBuilder())
                ->withGroups('json')
                ->toArray());
            return new JsonResponse($json_user, Response::HTTP_OK, [], true);
        }
        
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //Creer un Utilisateur
    #[Route('/users', name: 'createUser', methods: ['POST'])]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: User::class)
    )]
    public function createUser(UserPasswordHasherInterface $passwordHasher, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, UserRepository $user_repo): JsonResponse
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        
        if($user_repo->findOneBy(array('mail' => $user->getMail()))){
            return new JsonResponse("Already exist", Response::HTTP_FOUND, [], true);
        }

        $hashPassword = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashPassword);
        $json_user = $serializer->serialize($user, 'json', (new ObjectNormalizerContextBuilder())
                ->withGroups('json')
                ->toArray());
        $em->persist($user);
        $em->flush();

        return new JsonResponse($json_user, Response::HTTP_CREATED, [], true);
    }

    //Modifier un utilisateur
    #[Route('/api/users/{id}', name: 'updateUser', methods: ['PUT'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the user',
        schema: new OA\Schema(type: 'string')
    )]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: User::class)
    )]
    public function updateUser(UserPasswordHasherInterface $passwordHasher, Request $request, SerializerInterface $serializer, EntityManagerInterface $em, User $currentUser): JsonResponse
    {
        $postUser = $serializer->deserialize($request->getContent(), User::class, 'json', []);
       
        if($postUser->getPassword() != "") {
            $hashPassword = $passwordHasher->hashPassword($postUser, $postUser->getPassword());
            $currentUser->setPassword($hashPassword);
        }

        if($postUser->getName() != "") {
            $currentUser->setName($postUser->getName());
        }

        if($postUser->getMail() != "") {
            $currentUser->setMail($postUser->getMail());
        }

        if($postUser->getFirst_name() != "") {
            $currentUser->setFirst_name($postUser->getFirst_name());
        }

        $em->persist($currentUser);
        $em->flush();
        return new JsonResponse($postUser, Response::HTTP_OK, []);
    }

    //Supprimer un utilisateur
    #[Route('/api/users/{id}', name: 'deleteUser', methods: ['DELETE'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the user',
        schema: new OA\Schema(type: 'string')
    )]
    #[Security(name: 'Bearer')]
    public function deleteUser(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
